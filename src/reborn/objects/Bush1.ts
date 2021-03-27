import {Object3D} from "three";

import {green2, green3, orange} from "../../core/Materials";
import {Cube} from "./Cube";
import {cubeMesh, object} from "../../core/Framework";
import {getGround} from "../../world/ground/Ground";

export class Bush1 extends Object3D {
    constructor() {
        super();
        this.position.y = 1;
        new Cube(this, green3)
    }
}