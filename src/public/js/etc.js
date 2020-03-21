

//returns specific parent of an element.
export function find_parent(element,selector){
    let parents =[];
    while(element.parentNode){
      if (element.className == selector) break;
      element = element.parentNode;
    }
    return element;
}


