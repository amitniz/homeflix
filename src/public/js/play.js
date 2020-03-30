/*
  This file contains the code for the Video Player.
/*/

import * as memory from './memory.js'

//open the player panel.
export function open_panel(id,type,block){
    let player = block.querySelector('.player');
    if(type == 'series'){
      fetch_data('/q?type=series&_id='+id,player,build_panel);
    }else{
      fetch_data('/q?type=movies&_id='+id,player,build_panel);
    }
    window.panel_statei = true;
}

//close the panel.
export function close_panels(){
    let players = document.querySelectorAll('.player');
    for(var i=0;i< players.length;i++){
        players[i].style.display ='none';
        players[i].querySelector('video').pause(); //prevents from the video keep playing.
  }
    window.panel_state=false;
}

//build the panel content.
//TODO: move the style parts into style.css
export function build_panel(obj,player){
    if(obj[0]){ //check if the request returned items.
      let {name,genre,src,seasons} = obj[0];
        player.style.display ='flex';
        player.querySelector('.title').innerHTML = name;
        player.querySelector('.description').innerHTML = 'Genre : ' + genre
        if(seasons){
            add_seasons(player,seasons);
            player.querySelector('.episodes_block').innerHTML='';

            for(var i=0;i<seasons.length;i++){
                add_episodes(player,seasons[i]);
            }
            let saved_loc = memory.get_location(name);
            if(saved_loc){
                update_episodes_block(saved_loc.season);
            }else{
                update_episodes_block('s'+seasons[0][0]);
            }
            //Select the current season and episode.
            let seasons_list = player.querySelector('.seasons');
            let episodes_blocks = player.querySelectorAll('.episodes_block ui');
            if(saved_loc){
                play_episode(player.querySelector('video'),saved_loc.season,
                                                           saved_loc.episode,
                                                           saved_loc.time);
                select_li(seasons_list.querySelector('#'+saved_loc.season));
                //find the season's block
                for(let i=0;i<episodes_blocks.length;i++){
                    if(episodes_blocks[i].id == saved_loc.season){
                        select_li(episodes_blocks[i].querySelector(
                                                       '#'+saved_loc.episode))
                    }
                }
            }else{
                play_episode(player.querySelector('video'),'s'+seasons[0][0],'e1');
                select_li(seasons_list.children[0]);
                select_li(episodes_blocks[0].children[0]);
            }

        //Movies
        }else{
            player.querySelector('.mp4').src = movie_src(obj[0],'mp4');
			player.querySelectorAll('.subs')[0].src = movie_subs_src(obj[0],'eng');
			player.querySelectorAll('.subs')[1].src = movie_subs_src(obj[0],'heb');

            player.querySelector('video').load();
            player.querySelector('video').play();
        }
        player.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


//create the seasons list items
function add_seasons(player,seasons){
    var seasons_list = player.querySelector('.seasons');
    seasons_list.innerHTML=''; //clear the previous list items.
    for(var i=0;i<seasons.length;i++){
        var elem= document.createElement('li');
        elem.innerHTML= 'Season '+seasons[i][0];
        elem.setAttribute('id','s'+seasons[i][0]);
        seasons_list.appendChild(elem);
    }
}

//create the episodes lists.
function add_episodes(player,season,first_season=false){
    var block = player.querySelector('.episodes_block');
    var episode_ui = document.createElement('ui');
    for(var i=1;i<=season[1];i++){
        var elem = document.createElement('li');
        elem.setAttribute('id','e'+i);
        elem.innerHTML ='Episode '+i;
        episode_ui.setAttribute('id','s'+season[0]);
        episode_ui.setAttribute('class','episodes');
        episode_ui.appendChild(elem);
    }
    block.appendChild(episode_ui);
}

//reset the selected button.
function reset_selected_li(ui){
    var lis= ui.childNodes;
    for(var i=0;i<lis.length;i++){
        lis[i].classList.remove('selected')
    }
}

//select a button.
export function select_li(li){
    let episodes_uis = document.querySelectorAll('.episodes_block ui');
    if(li.textContent.includes('Episode')){
        for(var i=0;i<episodes_uis.length;i++){
            reset_selected_li(episodes_uis[i]);
        }
    }
    reset_selected_li(li.parentNode);
    li.classList.add('selected');
}

//show the requested episodes block.
export function update_episodes_block(season_id){
    let episodes_uis = document.querySelectorAll('.episodes_block ui');
    let selected = 0;
    for(var i=0;i<episodes_uis.length;i++){
        if(episodes_uis[i].id==season_id){
          episodes_uis[i].style.display ='block';
      }else{
        episodes_uis[i].style.display= 'none';
      }
    }
  }

//return the source of a movie.
function movie_src(json,ext){
    return json.src+'/'+json.name.replace(/ /g,'_').toLowerCase()+'.'+ext;
}

//return the subtitles source of an episode.
function subs_src(json,season,episode,lang){
    return json.src+'/'+season+'/subs/'+lang+'/'+episode+'.vtt';
}

//subs_src for movies TODO:merge 
function movie_subs_src(json,lang){
	return json.src+'/subs/'+lang+'/'+json.name.toLowerCase().replace(' ','_')+'.vtt'; 
}
//return the source of an episode.
function series_src(json,season,episode,ext){
    return json.src+'/'+season+'/'+episode+'.'+ext;
}

export function play_next(player){
  let current_pos = get_current_episode(player);
  //get num of episode for given season.
  //if has anothe episode
  //elif end of season but not the last.
  //remember to update the selected season and episode!

  console.log('ended');
}


export function scroll_images(e){
  let carousel=e.parentNode.querySelector('.Carousel');
  if(e.className=='Arrow right'){
    carousel.scrollBy({top:0,left:window.innerWidth,behavior:'smooth'});
  }else{
    carousel.scrollBy({top:0,left:-window.innerWidth,behavior:'smooth'});
  }
}


export function play_episode(player,season,episode,time=0){
  //TODO: replace the global variables.
  player.querySelector('.mp4').src = series_src(obj[0],season,episode,'mp4');
  player.querySelectorAll('.subs')[0].src =subs_src(obj[0],season,episode,'eng');
  player.querySelectorAll('.subs')[1].src =subs_src(obj[0],season,episode,'heb');
  player.load();
  player.currentTime = time;
  player.play();
}

function get_current_episode(vid){
  //TODO: beautify
  let extract = vid.querySelector('source').src.match(/[se][1-9]/g);
  return {season:extract[0], episode:extract[1]};
}
