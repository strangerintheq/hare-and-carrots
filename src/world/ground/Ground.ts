import {object, scene} from "../../core/Framework";
import {grassCell} from "../cells/grassCell";
import {waterCell} from "../cells/waterCell";
import {tree1Cell} from "../cells/tree1Cell";
import {tree2Cell} from "../cells/tree2Cell";
import {stoneCell} from "../cells/stoneCell";
import {carrotCell} from "../cells/carrotCell";
import {bushCell} from "../cells/bushCell";
import {signCell} from "../cells/signCell";
import {signs} from "../objects/Signs";
import {keyCell} from "../cells/keyCell";
import {getMapData, getMapKey} from "./Map";
import {mirrorHarePosition} from "../objects/Hare";
import {renderMiniMap} from "../../core/MiniMap";

const MAPS_INDEX_KEY = 'hare-maps-index';
const MAP_CURSOR_KEY = 'hare-map-cursor';

let mapCursor = restoreMapCursor();
let currentMap;
let ground;


export function saveMapData(data?) {
    const mapKey = getMapKey(mapCursor);
    if (!data)
        data = currentMap.map(row => row.map(cell => cell[0]))
    localStorage.setItem(mapKey, JSON.stringify(data))

    const indexData = localStorage.getItem(MAPS_INDEX_KEY);
    const index = indexData ? JSON.parse(indexData) : {};
    index[mapKey] = 1;
    localStorage.setItem(MAPS_INDEX_KEY, JSON.stringify(index));
}

export function clearMapData(){
    const indexData = localStorage.getItem(MAPS_INDEX_KEY);
    if (!indexData)
        return
    Object.keys(JSON.parse(indexData)).forEach(k => {
        localStorage.removeItem(k)
    })
    localStorage.removeItem(MAPS_INDEX_KEY)
}

export function getGround(){
    return ground;
}

export function getCell(pos:Array<number>) {
    try {
        return currentMap[pos[2] + 10][pos[0] + 10][0];
    } catch (e) {
        return undefined
    }
}

let cells = {
    W: waterCell,
    G: grassCell,
    T: tree1Cell,
    t: tree2Cell,
    S: stoneCell,
    C: carrotCell,
    B: bushCell,
    K: keyCell,

    s: signCell(signs.s),
    c: signCell(signs.c),
    g: signCell(signs.g),
    y: signCell(signs.y)
};

export function reCreateGround() {

    const data = getMapData(mapCursor, true);
    if (ground){
        ground.obj.parent.remove(ground.obj)
    }
    ground = object(scene)
    ground.possibleToMove = [];

    currentMap = data
    if (!Array.isArray(data))
        currentMap = split(currentMap)

    currentMap = currentMap.map((row, x) => {
        try {
            return row.map((cell, y) => {
                try {
                    let dy = cellElevation(cell);
                    return [cell, cells[cell[0]](x, y, dy)]
                } catch (e) {
                    console.error('error creating cell', cell)
                }
            });
        } catch (e) {
            console.error('error creating row', row)
        }
    });

    renderMiniMap(mapCursor);
}

export function cellElevation(cell) {
    return +cell[1]/10
}

export function split(data){
    return data .trim().split('\n')
        .map(row => row.trim().split(' ').map(c => c));
}

export function isWater(cell) {
    return cell[0] === 'W'
}

export function changeCell(x, y, targetCellType:string) {
    let cell = currentMap[y+10][x+10];
    let obj = cell[1].obj;
    targetCellType === 'G' && obj.parent.remove(obj);
    cell[0] = targetCellType + cell[0][1];
}

export function tryChangeMap(pos){
    if (Math.abs(pos[0]) === 10 || Math.abs(pos[2]) === 10) {
        mapCursor[0] += (pos[2]/10)|0;
        mapCursor[1] += (pos[0]/10)|0;
        reCreateGround();
        saveMapCursor();
        mirrorHarePosition()
    }
}

function saveMapCursor() {
    localStorage.setItem(MAP_CURSOR_KEY, JSON.stringify(mapCursor))
}

function restoreMapCursor() {
    const cursorData = localStorage.getItem(MAP_CURSOR_KEY)
    return cursorData ? JSON.parse(cursorData) : [0,0]
}

export function clearMapCursor(){
    localStorage.removeItem(MAP_CURSOR_KEY)
}