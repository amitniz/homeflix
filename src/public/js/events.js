
    import * as etc from './etc.js'
    import * as play from './play.js'


/******************************** Events *************************************/

    //close the video panel when clicked outside.
    document.addEventListener('click', evt=>{
      if(evt.target.className=='Carousel'|| evt.target.className=='Genre'){
          play.close_panels();
          evt.target.parentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    })

    //episode button.
    const episodes_block = document.querySelectorAll('.episodes_block');
    for(var i=0;i<episodes_block.length;i++){
      episodes_block[i].addEventListener('click',evt=>{
          if(evt.target.nodeName == 'LI'){
              play.select_li(evt.target);
              let video_player = etc.find_parent(evt.target,'player').querySelector('video');
              let season = evt.target.parentNode.id;
              let episode = evt.target.id;
              play.play_episode(video_player,season,episode);
         }
    });
    }

    //season button.
    const seasons_lis = document.querySelectorAll('.seasons');
    for(var i=0;i<seasons_lis.length;i++){
      seasons_lis[i].addEventListener('click',evt=>{
          if(evt.target.nodeName =='LI'){
              play.select_li(evt.target);
              let season = evt.target.innerHTML.split(' ')[1];
              play.update_episodes_block('s'+season);
          }
      });
    }
    //Arrows
    const arrows = document.querySelectorAll('.Arrow');
    for(var i=0;i<arrows.length;i++){
      arrows[i].addEventListener('mouseenter',function(){play.scroll_images(this)});
      arrows[i].addEventListener('click',function(){play.scroll_images(this)});
    }

    //Carousel imgs actions.
    const carousels = document.querySelectorAll('.Carousel');
    for(var i=0;i<carousels.length;i++){

      carousels[i].addEventListener('mouseover',evt =>{
          if(evt.target.className != "Carousel"){
              //evt.target.classList.add('hover_img');
              for(var j=0;j<evt.target.parentNode.childNodes.length;j++){
                if(evt.target.parentNode.childNodes[j]!=evt.target){
                  evt.target.parentNode.childNodes[j].style.opacity = 0.28;
                }
              }
          }
        });

      carousels[i].addEventListener('mouseout',evt=>{
          if(evt.target.className != "Carousel"){
            //evt.target.classList.remove('hover_img');
            for(var j=0;j<evt.target.parentNode.childNodes.length;j++){
              evt.target.parentNode.childNodes[j].style.opacity = 1;
            }
          }
        });

      carousels[i].addEventListener('click',evt=>{
          if(evt.target.className !="Carousel"){
              let type = evt.target.src.includes('series') ? 'series' : 'movies';
              if(!window.panel_state){
                 play.open_panel(evt.target.id,type,evt.target.parentNode.parentNode);
              }else{
                  play.close_panels();
                  evt.target.scrollIntoView({ behavior: 'smooth', block: 'end' });
              }
          }
        });
    }
