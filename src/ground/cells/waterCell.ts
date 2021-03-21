import {cubeMesh} from "../../Framework";
import {getGround} from "../Ground";
import {blue} from "../../Materials";

export function waterCell(x, y) {
    let obj = cubeMesh(getGround(), blue).scale(1, 0.6, 1).pos(y-10,-0.1,x-10);
    getGround().possibleToMove.push(obj.obj);
    return obj
}

