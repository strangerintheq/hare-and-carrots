import {getMapData} from "../world/ground/Map";



const minimap = document.createElement('div');
minimap.innerHTML = `
    <canvas style="position: fixed;right: 5px;bottom: 5px;" width="200" height="200"></canvas>
`;
const ctx = minimap.querySelector('canvas').getContext('2d');

ctx.translate(100,100)
ctx.rotate(Math.PI/4)
document.body.append(minimap)

export function renderMiniMap(mapCursor){
    ctx.clearRect(-1e5,-1e5,2e5,2e5)
    const s = 2.2;
    for(let y = -1; y<=1; y++) {
        for (let x = -1; x <= 1; x++) {
            let cur = [x+mapCursor[0], y+mapCursor[1]];

            let mapData = getMapData(cur);
            if (!mapData)
                continue
            mapData.forEach((row, Y) => {
                return row.forEach((cell, X) => {
                    ctx.fillStyle = cell[0] === 'W' ? 'blue' : 'green';
                    let x1 = (X - 10) * s+21*y*s;
                    let y1 = (Y - 10) * s+21*x*s;
                    ctx.fillRect(x1, y1, s+1, s+1);
                });
            });

           // ctx.font='20px Arial'
           // ctx.fillStyle ='red';
           // ctx.textAlign = 'center'
           // ctx.fillText(cur[0]+' '+cur[1], 22*y*s, 22*x*s)
        }
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2;
        ctx.strokeRect(-10*s, -10*s, 21*s, 21*s)
    }



}