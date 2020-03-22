
/*
############### Memory Managment ###############
*/


//get the location of given title.
export function get_location(title){
    return JSON.parse(localStorage.getItem(title));
}
//set the location of given title.
export function set_location(title,season,episode,time=0){
   localStorage.setItem(title,JSON.stringify({season,episode,time})); 
}


