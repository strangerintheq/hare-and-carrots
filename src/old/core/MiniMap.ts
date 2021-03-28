import {getMapData} from "../world/ground/Map";
import {signs} from "../world/objects/Signs";

const minimap = document.createElement('div');
minimap.innerHTML = `
    <canvas style="position: fixed;right: 5px;bottom: 5px;" width="200" height="200"></canvas>
`;
const ctx = minimap.querySelector('canvas').getContext('2d');

ctx.translate(100,100)
ctx.rotate(Math.PI/4)
document.body.append(minimap)

const s = 2;

const empty = [...Array(21)].map(()=>[...Array(21)])

export function renderMiniMap(mapCursor){
    ctx.clearRect(-1e5,-1e5,2e5,2e5)
    for(let y = -3; y<=3; y++) {
        for (let x = -3; x <= 3; x++) {
            let cur = [x+mapCursor[0], y+mapCursor[1]];
            let mapData = getMapData(cur);
            if (mapData) {
                fillCells(mapData, x, y, getCellColor)
            } else {
                fillCells(empty, x, y, randomGray)
                // drawCellIndex(cur, y, x);
            }
        }
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2;
        ctx.strokeRect(-10*s, -10*s, 21*s, 21*s)
    }
}

export function fillCells(mapData, x, y, colorFn){
    mapData.forEach((row, Y) => {
        return row.forEach((cell, X) => {
            ctx.fillStyle = colorFn(cell);
            let x1 = (X - 10) * s+21*y*s;
            let y1 = (Y - 10) * s+21*x*s;
            ctx.fillRect(x1, y1, s+1, s+1);
        });
    });
}

function randomGray() {
    const rnd = 50 + Math.random() * 150
    return `rgb(${rnd}, ${rnd}, ${rnd})`;
}

function drawCellIndex(cur: any[], y: number, x: number) {
    ctx.font = '20px Arial'
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center'
    ctx.fillText(cur[0] + ' ' + cur[1], 22 * y * s, 22 * x * s)
}

function getCellColor(cell) {
    if (cell[0] === 'W')
        return 'blue'
    if (signs[cell[0]])
        return 'gold'
    return  'green'
}