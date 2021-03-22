import SimplexNoise from 'simplex-noise'

const seed = '1';
const noises = {};

function noise(cellType, x, y) {
    if (!noises[cellType])
        noises[cellType] = new SimplexNoise(seed + cellType)
    return noises[cellType].noise2D(x,y)
}

export function getMapData(mapCursor) {
    let data = [];
    let mapSize = 19;
    for (let y = -10; y <= 10; y++) {
        let row = []
        for (let x = -10; x <= 10; x++) {
            let cx = y+mapCursor[0]*mapSize;
            let cy = x+mapCursor[1]*mapSize;
            row.push(singleCell(cx,cy));
        }
        data.push(row);
    }
    return data
}

function singleCell(cx, cy) {

    let cellHeight = noise('G', cx/25, cy/25);
    let cellType = 'W';
    if (cellHeight > 0) {
        cellType = 'G'
        if (noise('C', cx, cy) > 0.9)
            cellType = 'C'
        else if (noise('S', cx, cy) > 0.9)
            cellType = 'S'
        else if (noise( 'B', cx/9, cy/9) > 0.8)
            cellType = 'B'
        else if (noise( 'T', cx/9, cy/9) > 0.8)
            cellType = noise( 't', cx, cy) > 0 ? 'T' : 't'
        // else if (noises[4].noise2D(cx, cy) > 0.9)
        //     cellType =  't'
    }

    let heightValue = Math.abs(cellHeight*10) | 0;

    return `${cellType}${heightValue}`;
}
