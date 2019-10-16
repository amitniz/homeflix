
function open_panel(id,block){
    var player = block.querySelector('.player');
    use_data('/q?type=movies&_id='+id,player,build_panel);
    use_data('/q?type=series&_id='+id,player,build_panel);
    window.panel_state= true;
}

function close_panels(){
    var players = document.querySelectorAll('.player');
    for(var i=0;i< players.length;i++){
        players[i].style.display ='none';
        players[i].querySelector('video').pause();
  }
    window.panel_state=false;
}
function build_panel(obj,player){
    if(obj[0]){

        player.style.display ='flex';
        player.querySelector('.title').innerHTML = obj[0].name;
        player.querySelector('.description').innerHTML = 'Genre : ' +obj[0].genre
        if(obj[0].seasons){
            player.querySelector('.mkv').src =obj[0].src
                +'/season02'+'/1'+'.mkv'; 
            player.querySelector('.mp4').src =obj[0].src
                +'/season02'+'/1'+'.mp4'; 
            var seasons_list = player.querySelector('.seasons');
            seasons_list.innerHTML='';
            for(var i=1;i<=obj[0].seasons;i++){
                var elem= document.createElement('li');
                elem.innerHTML= 'season '+i;
                seasons_list.appendChild(elem);
                }
        }else{
            player.querySelector('.mkv').src =obj[0].src+'/'+obj[0].name.replace(' ','_').toLowerCase()+'.mkv'; 
            player.querySelector('.mp4').src =obj[0].src+'/'+obj[0].name.replace(' ','_').toLowerCase()+'.mp4'; 
        }
        player.scrollIntoView({ behavior: 'smooth', block: 'center' });
        player.querySelector('video').load();
    }
}


