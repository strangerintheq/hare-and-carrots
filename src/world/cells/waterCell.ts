import {cubeMesh} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {blue1} from "../../core/Materials";
import {blue2} from "../../core/Materials";

export function waterCell(x, y, dy) {
    console.log(dy)
    let material = dy > 0.6 ? blue2 : blue1;
    let obj = cubeMesh(getGround(), material)
        .scale(1, 0.6, 1)
        .pos(y-10,-0.1,x-10);
    getGround().possibleToMove.push(obj.obj);
    return obj;
}

