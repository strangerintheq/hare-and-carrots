import {cubeMesh, object} from "../../Framework";
import {getGround} from "../Ground";
import {grassCell} from "./grassCell";
import {brown, green3} from "../../Materials";

export function tree2Cell(x, y, dy) {
    grassCell(x,y,dy,true);
    let tree = object(getGround()).pos(y-10, 1+dy, x-10)
    cubeMesh(tree, brown).scale(0.3, 2, 0.3)
    cubeMesh(tree, brown).scale(2, 0.3, 0.3).pos( 0.65,1.5,0).rot(0,0, 0.7)
    cubeMesh(tree, brown).scale(2, 0.3, 0.3).pos(-0.65,1.5,0).rot(0,0,-0.7)
    cubeMesh(tree, green3).scale(1.5, 0.7, 1).pos(1.5,2,0)
    cubeMesh(tree, green3).scale(1, 0.7, 0.8).pos(1.7,2.5,0)
    cubeMesh(tree, green3).scale(1, 1, 1).pos(-1,2,0)
}


