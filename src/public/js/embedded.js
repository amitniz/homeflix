
/*
  This file contains all the communication with
  the server.
*/


fetch_data('/q?type=series','#series',load_titles);
fetch_data('/q?type=movies','#movies',load_titles);

//request for JSON object in a given url and pass it into a given function.
function fetch_data(url,id,func){

    var request = new XMLHttpRequest();
    request.open('POST',url);
    request.onload = function(){
        obj=JSON.parse(request.responseText);
        func(obj,id);
        }
    request.send();
}

//loads the titles items from a Given JSON.
function load_titles(obj,select){
    var block = document.querySelector(select);
    for(var i=0;i<obj.length;i++){
        var elem = document.createElement('img');
        elem.setAttribute('src',obj[i].src + '/cover.png');
        elem.setAttribute('id',obj[i]._id);
        block.appendChild(elem);
    }
}
