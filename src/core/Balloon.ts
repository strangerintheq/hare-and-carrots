import * as THREE from 'three'
import {getHare} from "../world/objects/Hare";
import {camera} from "./Framework";

const balloon : HTMLDivElement = document.createElement('div')
balloon.style.position = 'fixed';


export function showBalloon(size, content, action) {
    let widthHalf = innerWidth / 2,
        heightHalf = innerHeight / 2;
    let pos = new THREE.Vector3();
    pos = pos.setFromMatrixPosition(getHare().obj.matrixWorld);
    pos.project(camera);
    balloon.style.left = -20 + ( pos.x * widthHalf ) + widthHalf + 'px';
    balloon.style.top = -100 - ( pos.y * heightHalf ) + heightHalf+ 'px';
    balloon.innerHTML = makeSvg(size,content);
    balloon.querySelector('rect').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        action()
    };
    document.body.append(balloon)
}

export function hideBalloon(){
    balloon.remove();
    balloon.innerHTML = ''
}

function makeSvg(size, content){
    return `
        <svg pointer-events="none">
            <rect pointer-events="all"
                fill="white" 
                rx="15"
                width="${size[0]+30}"
                height="${size[1]+20}"
                cursor="pointer"></rect>
             <g >
                <circle r="12" fill="white" cx=25 cy=41></circle>
                <circle r="5" fill="white" cx=20 cy=58></circle>
                <circle r="2" fill="white" cx=15 cy=65></circle>
                <text x=15 y=25 fill="blue" text-decoration="underline">${content}</text>
            </g>
        </svg>
    `
}