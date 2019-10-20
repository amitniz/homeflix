

/*
  This file contains the code for the player panel.
/*/

//open the player panel.
function open_panel(id,type,block){
    let player = block.querySelector('.player');
    if(type == 'series'){
      fetch_data('/q?type=series&_id='+id,player,build_panel);
    }else{
      fetch_data('/q?type=movies&_id='+id,player,build_panel);
    }
    window.panel_state= true;
}
//close the panel.
function close_panels(){
    let players = document.querySelectorAll('.player');
    for(var i=0;i< players.length;i++){
        players[i].style.display ='none';
        players[i].querySelector('video').pause(); //prevents from the video keep playing.
  }
    window.panel_state=false;
}

//build the panel content.
//TODO: move the style parts into style.css
function build_panel(obj,player){
    if(obj[0]){ //check if the request returned items.
      const {name,genre,src,episodes,seasons} = obj[0];
        player.style.display ='flex';
        player.querySelector('.title').innerHTML = name;
        player.querySelector('.description').innerHTML = 'Genre : ' +genre
        if(seasons){
            player.querySelector('.mkv').src =src +'/s1/e1.mkv';
            player.querySelector('.mp4').src =src +'/s1/e1.mp4';
            add_seasons(player,seasons);
            player.querySelector('.episodes_block').innerHTML='';
            for(var i=0;i<seasons;i++){
                add_episodes(player,i,episodes);
            }
        }else{
            player.querySelector('.mkv').src =movie_src(obj[0],'mp4');
            player.querySelector('.mp4').src =movie_src(obj[0],'mp4');
        }
        player.scrollIntoView({ behavior: 'smooth', block: 'center' });
        player.querySelector('video').load();
        player.querySelector('video').play();
    }
}


//create the seasons list items
function add_seasons(player,seasons){
    var seasons_list = player.querySelector('.seasons');
    seasons_list.innerHTML=''; //clear the previous list items.
    for(var i=1;i<=seasons;i++){
        var elem= document.createElement('li');
        elem.innerHTML= 'season '+i;
        seasons_list.appendChild(elem);
        if(i==1) select_li(elem);
    }
}

//create the episodes lists.
function add_episodes(player,season,episodes){
    var block = player.querySelector('.episodes_block');
    var episode_ui = document.createElement('ui');
    for(var i=1;i<=episodes[season];i++){
        var elem = document.createElement('li');
        elem.setAttribute('id','e'+i);
        elem.innerHTML ='episode '+i;
        episode_ui.setAttribute('id','s'+(season+1));
        episode_ui.setAttribute('class','episodes');
        episode_ui.appendChild(elem);
        if(i==1) select_li(elem);
    }
    block.appendChild(episode_ui);
    update_episodes_block(1);
}

//reset the selected button.
function reset_selected_li(ui){
    var lis= ui.childNodes;
    for(var i=0;i<lis.length;i++){
        lis[i].classList.remove('selected')
    }
}

//select a button.
function select_li(li){
    reset_selected_li(li.parentNode);
    li.classList.add('selected');
}

//show the requested episodes block.
function update_episodes_block(s){
    var episodes_uis = document.querySelectorAll('.episodes_block ui');
    for(var i=0;i<episodes_uis.length;i++){
        episodes_uis[i].style.display= 'none';
    }
    episodes_uis[s-1].style.display ='block';
}

//return the source of a movie.
function movie_src(json,ext){
    return json.src+'/'+json.name.replace(/ /g,'_').toLowerCase()+'.'+ext;
}

//return the source of an episode.
function series_src(json,season,episode,ext){
    return json.src+'/'+season+'/'+episode+'.'+ext;
}

function play_next(){
  console.log('ended');
}


function scroll_images(e){
  let carousel=e.parentNode.querySelector('.Carousel');
  if(e.className=='Arrow right'){
    carousel.scrollBy({top:0,left:window.innerWidth,behavior:'smooth'});
  }else{
    console.log('scroll left');
    carousel.scrollBy({top:0,left:-window.innerWidth,behavior:'smooth'});
  }
}
