import {cubeMesh, object} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {grassCell} from "./grassCell";
import {gold} from "../../core/Materials";

export function keyCell(x, y, dy) {
    grassCell(x, y, dy)

    let key = object(getGround())
        .pos(y-10, 0.55+dy, x-10);

    cubeMesh(key, gold)
        .pos(-0.3,0,0)
        .scale(0.2, 0.1, 0.2)
    cubeMesh(key, gold)
        .scale(0.4, 0.1, 0.1)
    return key
}
