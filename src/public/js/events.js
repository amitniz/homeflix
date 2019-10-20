

    //close the video panel when clicked outside.
    document.addEventListener('click', evt=>{
      if(evt.target.className=='Carousel'|| evt.target.className=='Genre'){
          close_panels();
          evt.target.parentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    })

    //episode button.
    var episodes_block =document.querySelector('.episodes_block');
    episodes_block.addEventListener('click',evt=>{
        if(evt.target.nodeName=='LI'){
            reset_selected_li(evt.target.parentNode);
            select_li(evt.target);
            var s = evt.target.parentNode.id;
            var e = evt.target.id;
            //need to choose from player.
            document.querySelector('.mp4').src =series_src(obj[0],s,e,'mp4');
            document.querySelector('.mkv').src =series_src(obj[0],s,e,'mkv');
            document.querySelector('video').load();
            document.querySelector('video').play();
       }
    });

    //season button.
    var seasons_lis = document.querySelector('.seasons');
        seasons_lis.addEventListener('click',evt=>{
            if(evt.target.nodeName =='LI'){
                reset_selected_li(evt.target.parentNode);
                select_li(evt.target);
                var s=evt.target.innerHTML.split(' ')[1];
                console.log(s);
                update_episodes_block(Number(s));
            }
        });

    //Arrows
    let arrows = document.querySelectorAll('.Arrow');
    for(var i=0;i<arrows.length;i++){
      arrows[i].addEventListener('mouseenter',function(){scroll_images(this)});
      arrows[i].addEventListener('click',function(){scroll_images(this)});
    }

    //Carousel imgs actions.
    var carousels = document.querySelectorAll('.Carousel');
    for(var i=0;i<carousels.length;i++){

      carousels[i].addEventListener('mouseover',evt =>{
          if(evt.target.className != "Carousel"){
              evt.target.classList.add('hover_img');
              for(var j=0;j<evt.target.parentNode.childNodes.length;j++){
                if(evt.target.parentNode.childNodes[j]!=evt.target){
                  evt.target.parentNode.childNodes[j].style.opacity = 0.28;
                }
              }
          }
        });

      carousels[i].addEventListener('mouseout',evt=>{
          if(evt.target.className != "Carousel"){
            evt.target.classList.remove('hover_img');
            for(var j=0;j<evt.target.parentNode.childNodes.length;j++){
              evt.target.parentNode.childNodes[j].style.opacity = 1;
            }
          }
        });

      carousels[i].addEventListener('click',evt=>{
          if(evt.target.className !="Carousel"){
              let type = evt.target.src.includes('series') ? 'series' : 'movies';
              if(!window.panel_state){
                 open_panel(evt.target.id,type,evt.target.parentNode.parentNode);
              }else{
                  close_panels();
                  evt.target.scrollIntoView({ behavior: 'smooth', block: 'end' });
              }
          }
        });
    }
