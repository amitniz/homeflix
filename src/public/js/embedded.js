
/*
  This file contains all the communication with
  the server.
*/



fetch_data('/q?type=series','#series',load_titles);
fetch_data('/q?type=movies&genre=drama','#Drama_or_Adventure_Movies',load_titles);
fetch_data('/q?type=movies&genre=adventure','#Drama_or_Adventure_Movies',load_titles);
fetch_data('/q?type=movies&genre=comedy','#comedy_Movies',load_titles);
fetch_data('/q?type=movies&genre=action','#action_or_Thriller_Movies',load_titles);
fetch_data('/q?type=movies&genre=thriller','#action_or_Thriller_Movies',load_titles);
fetch_data('/q?type=movies&genre=family','#Family_Movies',load_titles);
fetch_data('/q?type=movies','#all_Movies',load_titles);


//request for JSON object in a given url and pass it into a given function.
function fetch_data(url,id,func){

    var request = new XMLHttpRequest();
    request.open('POST',url);
    request.onload = function(){
        obj = JSON.parse(request.responseText);
        func(obj,id);
        }
    request.send();
}

//loads the titles items from a Given JSON.
function load_titles(obj,select){
    let block = document.querySelector(select);
    for(var i=0;i<obj.length;i++){
        var elem = document.createElement('img');
        elem.setAttribute('src',obj[i].src + '/cover.png');
        elem.setAttribute('id',obj[i]._id);
        block.appendChild(elem);
    }
    shuffle_childs(block);
}

function shuffle_childs(element){
  for(var i=element.children.length; i>=0;--i)
    element.appendChild(element.children[Math.random()*i|0]);
}

