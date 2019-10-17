
    


    document.addEventListener('click', e=>{
      if(e.target.parentNode.className!='player'&&e.target.nodeName!='LI'&&e.target.parentNode.parentNode.className!='info'&&e.target.parentNode.className!='Carousel'){
          close_panels();
          e.target.parentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    })

    var episodes_block =document.querySelector('.episodes_block');
    episodes_block.addEventListener('click',evt=>{
        if(evt.target.nodeName=='LI'){
            reset_selected_li(evt.target.parentNode);
            select_li(evt.target);
            var s = evt.target.parentNode.id;
            var e = evt.target.id;
            //need to choose from player.
            document.querySelector('.mp4').src =series_src(s,e,'mp4');
            document.querySelector('.mkv').src =series_src(s,e,'mkv');
            document.querySelector('video').load();
            document.querySelector('video').play();
       }
    });

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

    var carousels = document.querySelectorAll('.Carousel');
    for(var i=0;i<carousels.length;i++){
      carousels[i].addEventListener('mouseover',e =>{
          if(e.target.className != "Carousel"){
              e.target.setAttribute('class','hover_img');    
          }});

      carousels[i].addEventListener('mouseout',e=>{
          if(e.target.className != "Carousel"){
            e.target.setAttribute('class','');
          }});

      carousels[i].addEventListener('click',e=>{
          if(e.target.className !="Carousel"){
              if(!window.panel_state){
                 open_panel(e.target.id,e.target.parentNode.parentNode);
              }else{
                  close_panels();
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'end' });
              }
              
          }})
    }


    var infos =document.querySelectorAll('.info');
    for(var i=0;i<infos.length;i++){
        infos[i].addEventListener('mouseover',function(){
            this.style.opacity ='1';
        });

        infos[i].addEventListener('mouseout',function(){
            this.style.opacity ='0';

        });
    }
