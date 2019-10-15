

const SCALE_FACTOR =1.5;


    var carousels = document.querySelectorAll('.Carousel');
    for(var i=0;i<carousels.length;i++){
      carousels[i].addEventListener('mouseover',e =>{
          if(e.target.className != "Carousel"){
              e.target.style.zIndex='1';
              e.target.style.transform='scale(1.3,1.3)'}});

      carousels[i].addEventListener('mouseout',e=>{
          if(e.target.className != "Carousel"){
            e.target.style.zIndex='0';
            e.target.style.transform='scale(1,1)'}});

      carousels[i].addEventListener('click',e=>{
          if(e.target.className !="Carousel"){
              open_panel(e.target.id,e.target.parentNode.parentNode);
          }})
    }
