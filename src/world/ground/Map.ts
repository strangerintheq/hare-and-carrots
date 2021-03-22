import SimplexNoise from 'simplex-noise'
import {saveMapData} from "./Ground";

const MAP_SEED_KEY = 'hare-seed';
const MAP_KEY = 'hare-map-';

let seed = getSeed();
let noises = {};

function noise(cellType, x, y) {
    if (!noises[cellType])
        noises[cellType] = new SimplexNoise(seed + cellType)
    return noises[cellType].noise2D(x, y)
}

export function getMapKey(mapCursor) {
    return MAP_KEY + JSON.stringify(mapCursor);
}

export function getMapData(mapCursor, force = false) {
    const entryLocation = mapCursor[0] === 0 && mapCursor[1] === 0;
    const mapKey = getMapKey(mapCursor);
    const savedData = localStorage.getItem(mapKey);
    if (savedData)
        return JSON.parse(savedData);

    if (!force)
        return null

    let data = [];
    let mapSize = 19;
    for (let y = -10; y <= 10; y++) {
        let row = []
        for (let x = -10; x <= 10; x++) {
            let cx = y + mapCursor[0] * mapSize;
            let cy = x + mapCursor[1] * mapSize;
            row.push(singleCell(cx, cy, x, y, entryLocation));
        }
        data.push(row);
    }

    saveMapData(data)

    return data;
}


function singleCell(cx, cy, x, y, entryLocation) {
    let onEdge = Math.abs(x) === 10 || Math.abs(y) === 10;
    let cellHeight = noise('G', cx / 25, cy / 25);
    let nearWater = cellHeight < 0.2;
    let cellType = 'W';


    const isEntry = entryLocation && x * x + y * y < 25;

    if (isEntry || cellHeight > 0) {
        cellType = 'G'
        if (isEntry && x === -2 && y === -2)
            cellType = 's'
        else if (isEntry && x === 2 && y === -2)
            cellType = 'c'
        else if (isEntry && x === -2 && y === 2)
            cellType = 'g'
        else if (isEntry)
            cellType = 'G'
        else if (!onEdge && noise('C', cx, cy) > 0.9)
            cellType = 'C'
        else if (!onEdge && noise('S', cx, cy) > 0.9)
            cellType = 'S'
        else if (!onEdge && noise('K', cx/5, cy/5) > 0.95)
            cellType = 'K'
        else if (noise('B', cx / 9, cy / 9) > 0.8)
            cellType = 'B'
        else if (noise('T', cx / 5, cy / 5) > 0.8)
            cellType = noise('t', cx, cy) > 0 ? 'T' : 't'
        // else if (noises[4].noise2D(cx, cy) > 0.9)
        //     cellType =  't'
    }

    let heightValue = Math.abs(cellHeight * 10) | 0;
    if (isEntry)
        heightValue = Math.max(0, cellHeight*10)|0
    return `${cellType}${heightValue}`;
}

function getSeed() {
    let seed = localStorage.getItem(MAP_SEED_KEY);
    if (!seed)
        seed = Math.random().toString(36).substring(2);
    localStorage.setItem(MAP_SEED_KEY, seed);
    return seed;
}

export function clearMapSeed() {
    localStorage.removeItem(MAP_SEED_KEY)
    seed = getSeed();
    noises = {}
}