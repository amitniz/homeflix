


export function find_parent(element,selector){
    let parents =[];
    while(element.parentNode){
      if (element.parentNode.tagName==selector) break;
      element = element.parentNode;
    }
    return element;
}
