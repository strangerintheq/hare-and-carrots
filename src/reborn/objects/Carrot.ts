import {Object3D} from "three";

import {green2, orange} from "../../core/Materials";
import {Cube} from "./Cube";

export class Carrot extends Object3D {
    constructor() {
        super();
        this.position.y = 0.5;
        new Cube(this, orange).sc(0.3, 0.2, 0.3)
        new Cube(this, green2).sc(0.1, 1, 0.1)
    }
}