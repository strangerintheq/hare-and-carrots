
import {brown1, green3} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class Tree2 extends Obj {
    constructor() {
        super();
        this.pos(0,1,0);
        new Cube(this, brown1).sc(0.3, 2, 0.3)
        new Cube(this, brown1).sc(2, 0.3, 0.3).pos( 0.65,1.5,0).rot(0,0, 0.7)
        new Cube(this, brown1).sc(2, 0.3, 0.3).pos(-0.65,1.5,0).rot(0,0,-0.7)
        new Cube(this, green3).sc(1.5, 0.7, 1).pos(1.5,2,0)
        new Cube(this, green3).sc(1, 0.7, 0.8).pos(1.7,2.5,0)
        new Cube(this, green3).sc(1, 1, 1).pos(-1,2,0)
    }
}