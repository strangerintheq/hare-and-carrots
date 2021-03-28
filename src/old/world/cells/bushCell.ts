import {cubeMesh, object, svg, texture} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {grassCell} from "./grassCell";
import {green3} from "../../core/Materials";

export function bushCell(x, y, dy) {
    grassCell(x,y,dy);
    let bush = object(getGround()).pos(y-10, 1+dy, x-10);
    cubeMesh(bush, green3).scale(1, 1, 1);
    return bush;
}



