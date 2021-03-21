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

let currentMap;
let ground;

export function getGround(){
    return ground;
}

export function getCell(pos) {
    return currentMap[pos[2]+10][pos[0]+10][0];
}

export function createGround(data) {

    ground = object(scene).pos(0, 0, 0);
    ground.possibleToMove = [];

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

    currentMap = data
    if (!Array.isArray(data))
        currentMap = split(currentMap)

    currentMap = currentMap.map((row, x) => {
        try {
            return row.map((cell, y) => {
                try {
                    return [cell, cells[cell[0]](x, y, cellElevetion(cell))]
                } catch (e) {}
            });
        } catch (e) {}
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