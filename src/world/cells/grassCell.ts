import {cubeMesh} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {brown, green} from "../../core/Materials";

export function grassCell(x, y, dy, cantStandOn?) {
    let obj = cubeMesh(getGround(), green).scale(1, 0.1, 1).pos(y-10,0.45+dy,x-10);
    cubeMesh(getGround(), brown).scale(1, 0.8, 1).pos(y-10,dy,x-10);
    !cantStandOn && getGround().possibleToMove.push(obj.obj);
    return obj
}

