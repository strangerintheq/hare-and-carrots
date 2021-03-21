import * as THREE from 'three'
import {getCell} from "../ground/Ground";
import {camera} from "../Framework";
import {getHare, getTargetLocation} from "../objects/Hare";

export const signs = createSigns();

function createSigns() {
    return {
        c: {
            size: [130, 25],
            link: 'https://codepen.io/strangerintheq',
            text: 'My codepen account',
            svg: codepenSvg()
        },
        s: {
            size: [110, 25],
            link: 'https://strangerintheq.github.io/mandelbrot.html',
            text: 'compleXplorer 0',
            svg: fractalSvg()
        },
        g: {
            size: [110, 25],
            link: 'https://t.me/mathimages',
            text: 'telegram channel',
            svg: telegramSvg()
        },
        y: {
            size: [130, 25],
            link: 'https://www.youtube.com/channel/UCb-Aki5QnswSeVRWy7K8VFw',
            text: 'My youtube account',
            svg: youtubeSvg()
        }
    };

    function codepenSvg() {
        return `<path fill="none" stroke="black"
                  stroke-width="4" stroke-linejoin="round"
                  d="
                    m50,5 l25,20 l-25,20 l-25,-20 z
                    m0,20 l25,20 l-25,20 l-25,-20 z
                    m0,0 l0,-20
                    m25,20 l0,20
                    m-25,20 l0,-20
                    m-25,-20 l0,20
                  " />`;
    }

    function fractalSvg() {
        return `
            <circle r="25" cx="60" cy="35"></circle>
            <circle r="10" cx="25" cy="35"></circle>
            <circle r="4" cx="12" cy="35"></circle>
        `;
    }

    function telegramSvg() {
        return `
<svg xmlns="http://www.w3.org/2000/svg" height="80" width="120" viewBox="0 -30 312 360">
<defs>
<linearGradient gradientUnits="userSpaceOnUse" y2="180" y1="40.08" x2="100.08" x1="160.08" id="a">
<stop stop-color="#37aee2" offset="0"/><stop stop-color="#1e96c8" offset="1"/></linearGradient>
<linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(1.0919 .91583)" y2="174.66" y1="131.039" x2="146.503" x1="123.677" id="b"><stop stop-color="#eff7fc" offset="0"/><stop stop-color="#fff" offset="1"/></linearGradient>
</defs>
<circle fill="url(#a)" r="120" cy="120" cx="120"/>
<path d="M98 175c-3.888 0-3.227-1.468-4.568-5.17L82 132.207 170 80" fill="#c8daea"/>
<path d="M98 175c3 0 4.325-1.372 6-3l16-15.558-19.958-12.035" fill="#a9c9dd"/>
<path d="M100.04 144.41l48.36 35.729c5.519 3.045 9.501 1.468 10.876-5.123l19.685-92.763c2.015-8.08-3.08-11.746-8.36-9.349l-115.59 44.571c-7.89 3.165-7.843 7.567-1.438 9.528l29.663 9.259 68.673-43.325c3.242-1.966 6.218-.91 3.776 1.258" fill="url(#b)"/>
</svg>
        `;
    }

    function youtubeSvg() {
        return ``;
    }
}

export function checkHareIsNearSign() {
    let targetLocation = getTargetLocation();
    let baloon : HTMLElement= document.querySelector('.balloon');
    baloon.style.display = "none"
    for(let x=-1;x<=1;x++){
        for(let z=-1;z<=1;z++) {
            let cell = getCell([x+targetLocation[0],targetLocation[1],z+targetLocation[2]]);
            if (signs[cell[0]]) {
                updateBalloon(cell[0], getHare(), camera)
                break
            }
        }
    }
}

function updateBalloon(type, hare, camera) {
    let balloon: HTMLElement  = document.querySelector('.balloon');
    balloon.style.display = 'block';
    let widthHalf = innerWidth / 2, heightHalf = innerHeight / 2;
    let pos = new THREE.Vector3();
    pos = pos.setFromMatrixPosition(hare.obj.matrixWorld);
    pos.project(camera);
    balloon.style.left = -20 + ( pos.x * widthHalf ) + widthHalf + 'px';
    balloon.style.top = -100 - ( pos.y * heightHalf ) + heightHalf+ 'px';
    let link = document.querySelector('#balloon');
    let s = signs[type];
    link.textContent = s.text;
    link.setAttribute('target', '_blank')
    link.setAttribute('href', s.link);
    balloon.querySelector('path').setAttribute('d', `m5,10
                 a10,10,0,0,1,10,-10
                 h${s.size[0]}
                 a10,10,0,0,1,10,10
                 v${s.size[1]}
                 a10,10,0,0,1,-10,10
                 h-${s.size[0]}
                 a10,10,0,0,1,-10,-10
                 z`);
}
