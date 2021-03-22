import {object, scene} from "../Framework";
import {grassCell} from "./cells/grassCell";
import {waterCell} from "./cells/waterCell";
import {tree1Cell} from "./cells/tree1Cell";
import {tree2Cell} from "./cells/tree2Cell";
import {stoneCell} from "./cells/stoneCell";
import {carrotCell} from "./cells/carrotCell";
import {bushCell} from "./cells/bushCell";
import {signCell} from "./cells/signCell";
import {signs} from "../signs/Signs";
import {keyCell} from "./cells/keyCell";
import {getMapData} from "./Map";
import {mirrorHarePosition} from "../objects/Hare";

let currentMap;
let activeMapCoordinates = [0,0];
let ground;

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

    const data = getMapData(activeMapCoordinates);
    // console.log('create ground',data)
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
                    return [cell, cells[cell[0]](x, y, cellElevetion(cell))]
                } catch (e) {
                    console.error('error creating cell', cell)
                }
            });
        } catch (e) {
            console.error('error creating row', row)
        }
    });
}

export function cellElevetion(cell) {
    return +cell[1]/5
}

export function split(data){
    return data .trim().split('\n')
        .map(row => row.trim().split(' ').map(c => c));
}

export function isWater(cell) {
    return cell[0] === 'W'
}


export function clearCell(pos){
    let obj = currentMap[pos[2]+10][pos[0]+10][1].obj;
    obj.parent.remove(obj);
    currentMap[pos[2]+10][pos[0]+10][0] = 'G0'
}

export function tryChangeMap(pos){
    if (Math.abs(pos[0]) === 10 || Math.abs(pos[2]) === 10) {
        activeMapCoordinates[0] += (pos[0]/10)|0;
        activeMapCoordinates[1] += (pos[2]/10)|0;
        reCreateGround();
        mirrorHarePosition()
    }
}