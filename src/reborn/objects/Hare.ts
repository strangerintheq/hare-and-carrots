import {Object3D} from "three";
import {red, white} from "../../core/Materials";
import {Cube} from "./Cube";

export class Hare extends Object3D {

    constructor() {
        super();

        // body
        new Cube(this, white)
            .sc(0.8, 0.8, 0.8)

        // legs
        new Cube(this, white)
            .sc(0.7, 0.7, 0.7)
            .pos(0,-0.2, 0);

        // ears
        new Cube(this, white)
            .sc(0.2, 0.6, 0.05)
            .pos(0.15, .6, -0.3);

        new Cube(this, white)
            .sc(0.2, 0.6, 0.05)
            .pos(-0.15, .6, -0.3);

        // tail
        new Cube(this, white)
            .sc(0.1, 0.1, 0.1)
            .pos(0, -0.2, -0.45);

        // mouth
        new Cube(this, red)
            .sc(0.3, 0.1, 0.1)
            .pos(0, -0.1, 0.45);
    }


    mirrorPosition(sectorHalfSize:number) {
        let s0 = sectorHalfSize - 1;
        if (Math.abs(this.position.x) === sectorHalfSize)
            this.position.x = - Math.sign(this.position.x) * s0;
        if (Math.abs(this.position.z) === sectorHalfSize)
            this.position.z = - Math.sign(this.position.z) * s0;
    }
}