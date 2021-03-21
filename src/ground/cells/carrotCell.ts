import {cubeMesh, object} from "../../Framework";
import {grassCell} from "./grassCell";
import {getGround} from "../Ground";
import {green2, orange} from "../../Materials";

export function carrotCell(x, y, dy) {
    grassCell(x, y, dy);
    let carrot = object(getGround()).pos(y-10, 0.55+dy, x-10);
    cubeMesh(carrot, orange).scale(0.3, 0.2, 0.3)
    cubeMesh(carrot, green2).scale(0.1, 1, 0.1)
    return carrot;
}
