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

let currentMap;
let mapCursor = [0,0];
let ground;

export function saveMapData(data?) {
    const mapKey = getMapKey(mapCursor);
    if (!data)
        data = currentMap.map(row => row.map(cell => cell[0]))
    localStorage.setItem(mapKey, JSON.stringify(data))

    const key = 'hare-maps-index';
    const indexData = localStorage.getItem(key);
    const index = indexData ? JSON.parse(indexData) : {};
    index[mapKey] = 1;
    localStorage.setItem(key, JSON.stringify(index));
}

export function getGround(){
    return ground;
}

export function getCell(pos) {
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

    const data = getMapData(mapCursor);
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

export function clearCell(x,y) {
    let cell = currentMap[y+10][x+10];
    let obj = cell[1].obj;
    obj.parent.remove(obj);
    cell[0] = 'G' + cell[0][1];
}

export function tryChangeMap(pos){
    if (Math.abs(pos[0]) === 10 || Math.abs(pos[2]) === 10) {
        mapCursor[0] += (pos[2]/10)|0;
        mapCursor[1] += (pos[0]/10)|0;
        reCreateGround();
        mirrorHarePosition()
    }
}