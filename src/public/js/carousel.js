
    document.addEventListener('click', e=>{
      if(e.target.parentNode.className!='player'&&e.target.parentNode.parentNode.className!='info'&&e.target.parentNode.className!='Carousel'){
          close_panels();
          e.target.parentNode.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    })

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
