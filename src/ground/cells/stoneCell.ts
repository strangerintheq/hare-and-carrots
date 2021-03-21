import {cubeMesh, object} from "../../Framework";
import {getGround} from "../Ground";
import {grassCell} from "./grassCell";
import {gray} from "../../Materials";

export function stoneCell(x, y, dy) {
    grassCell(x, y, dy)
    let stone = object(getGround()).pos(y-10, 0.55+dy, x-10);
    cubeMesh(stone, gray).scale(0.3+Math.random()*0.2, 0.2, 0.2+Math.random()*0.2)
}
