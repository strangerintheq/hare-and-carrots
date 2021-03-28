let buttons = document.createElement('div');
buttons.style.position = 'fixed';
buttons.style.top = '5px';
buttons.style.right = '5px';
document.body.append(buttons);

export class SvgButton {
    constructor(svg: string, onclick: () => void) {
        let div = document.createElement('div')
        div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
            width="88" height="88" viewBox="0 0 24 24" 
            stroke-width="1.5" stroke="#2c3e50" fill="none" 
            stroke-linecap="round" stroke-linejoin="round">
            ${svg}
        </svg>`;
        div.onclick = onclick;
        buttons.append(div);
    }
}