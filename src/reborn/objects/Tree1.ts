import {Object3D} from "three";

import {brown1, green, green2} from "../../core/Materials";
import {Cube} from "./Cube";


export class Tree1 extends Object3D {
    constructor() {
        super();
        this.position.y = 1;
        new Cube(this, brown1).sc(0.3, 2, 0.3)
        new Cube(this, green).sc(1.5, 2, 1.5).pos(0,2,0)
        new Cube(this, green2).sc(1, 2.5, 1).pos(0,2,0)
        new Cube(this, green2).sc(2, 1.5, 1).pos(0,2,0)
        new Cube(this, green2).sc(1, 1.5, 2).pos(0,2,0)
    }
}