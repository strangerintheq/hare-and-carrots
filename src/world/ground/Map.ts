import SimplexNoise from 'simplex-noise'
import {saveMapData} from "./Ground";

const seed = getSeed();
const noises = {};

function noise(cellType, x, y) {
    if (!noises[cellType])
        noises[cellType] = new SimplexNoise(seed + cellType)
    return noises[cellType].noise2D(x,y)
}

export function getMapKey(mapCursor) {
    return 'hare-map-' + JSON.stringify(mapCursor);
}

export function getMapData(mapCursor) {

    const mapKey = getMapKey(mapCursor);
    const savedData = localStorage.getItem(mapKey);
    if (savedData)
        return JSON.parse(savedData);

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

    saveMapData(data)

    return data;
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

function getSeed() {
    let seedKey = 'hare-seed';
    let seed = localStorage.getItem(seedKey);
    if (!seed)
        seed = Math.random().toString(36).substring(2);
    localStorage.setItem(seedKey, seed);
    return seed;
}