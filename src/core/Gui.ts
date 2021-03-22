import {clearMapSeed} from "../world/ground/Map";
import {clearMapCursor, clearMapData} from "../world/ground/Ground";
import {clearLocation} from "../world/objects/Hare";

const items = document.createElement('div')
items.innerHTML = `
    <svg viewBox="0,0,200,50" 
        width="200" height="50" 
        style="position: fixed;top:5px;left:5px" 
        text-anchor="middle" dominant-baseline="central"
    >
        <g font-size="40px">
            <text x="25" y="25">🥕</text>
            <text x="75" y="25">🔑</text>
            <text x="125" y="25">💩</text>
        </g>
        <g font-size="25px" fill="red" stroke="black" stroke-width="0.5">
            <text class="C" x="35" y="40">22</text>
            <text class="K" x="65" y="40">22</text>
            <text class="S" x="125" y="40">22</text>
        </g>
    </svg>
`

// document.body.append(items)

export function addItem(type){
    items.querySelector(type)
}


const restart = document.createElement('div')
restart.innerHTML = `
    <svg viewBox="0,0,50,50" width="50" height="50" style="position: fixed;top:5px;right:5px;cursor:pointer ">
        <g text-anchor="middle" dominant-baseline="central" font-size="40px">
            <text x="25" y="25">🔄</text>
        </g>
    </svg>
`;

document.body.append(restart);

restart.querySelector('svg').onclick = () => {
    clearMapSeed();
    clearMapData();
    clearMapCursor();
    clearLocation();
    document.location.reload()
}