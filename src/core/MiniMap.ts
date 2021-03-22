import {getMapData} from "../world/ground/Map";



const minimap = document.createElement('div');
minimap.innerHTML = `
    <canvas style="position: fixed;right: 5px;bottom: 5px;" width="200" height="200"></canvas>
`;
const ctx = minimap.querySelector('canvas').getContext('2d');

ctx.translate(100,100)
ctx.rotate(Math.PI/4)
document.body.append(minimap)

export function fillMiniMap(mapCursor){
    const s = 2.2;


    for(let y = -1; y<=1; y++) {
        for (let x = -1; x <= 1; x++) {
            let mapData = getMapData([x+mapCursor[1], y+mapCursor[0]]);
            mapData.forEach((row, Y) => {
                return row.forEach((cell, X) => {
                    ctx.fillStyle = cell[0] === 'W' ? 'blue' : 'green';
                    let x1 = (X - 10) * s-0.5+22*y*s;
                    let y1 = (Y - 10) * s-0.5+22*x*s;
                    ctx.fillRect(x1,y1, s+1, s+1);
                });
            });
        }
    }



}