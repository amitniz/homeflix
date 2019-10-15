
use_data('/get_series','#series',load_images);
use_data('/get_movies','#movies',load_images);

function use_data(url,id,func){

    var request = new XMLHttpRequest();
    request.open('POST',url);
    request.onload = function(){
        obj=JSON.parse(request.responseText);
        func(obj,id);
        }
    request.send();
}

function load_images(obj,select){
    var block = document.querySelector(select);
    for(var i=0;i<obj.length;i++){
        var elem = document.createElement('img');
        elem.setAttribute('src',obj[i].src + '/cover.png');
        elem.setAttribute('id',obj[i]._id);
        block.appendChild(elem);
    }
}

