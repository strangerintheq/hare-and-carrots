import {cubeMesh, object} from "../../Framework";
import {getGround} from "../Ground";
import {grassCell} from "./grassCell";
import {brown, green, green2} from "../../Materials";

export function tree1Cell(x, y, dy) {
    grassCell(x,y,dy,true);
    let tree = object(getGround()).pos(y-10, 1+dy, x-10);
    cubeMesh(tree, brown).scale(0.3, 2, 0.3)
    cubeMesh(tree, green).scale(1.5, 2, 1.5).pos(0,2,0)
    cubeMesh(tree, green2).scale(1, 2.5, 1).pos(0,2,0)
    cubeMesh(tree, green2).scale(2, 1.5, 1).pos(0,2,0)
    cubeMesh(tree, green2).scale(1, 1.5, 2).pos(0,2,0)
}

