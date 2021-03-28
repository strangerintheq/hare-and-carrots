
let el = document.createElement('div')
el.style.position = 'fixed'
el.style.top = '5px'
el.style.left = '5px'
document.body.append(el);

let prev :string = '';

export function info(str: string){
    if (str === prev)
        return
    prev = str;
    el.innerHTML = str;
}