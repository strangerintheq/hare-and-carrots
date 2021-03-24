import {cubeMesh, object} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {grassCell} from "./grassCell";
import {brown2} from "../../core/Materials";

export function stoneCell(x, y, dy) {
    grassCell(x, y, dy)
    let stone = object(getGround()).pos(y-10, 0.55+dy, x-10);
    cubeMesh(stone, brown2).scale(0.3+Math.random()*0.2, 0.2, 0.2+Math.random()*0.2)
    return stone
}
