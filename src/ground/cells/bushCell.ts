import {cubeMesh, object, svg, texture} from "../../Framework";
import {getGround} from "../Ground";
import {grassCell} from "./grassCell";
import {green3} from "../../Materials";

export function bushCell(x, y, dy) {
    grassCell(x,y,dy);
    let bush = object(getGround()).pos(y-10, 1+dy, x-10);
    cubeMesh(bush, green3).scale(1, 1, 1)
}



