import {red, white} from "../../old/core/Materials";
import {Cube} from "../objects/Cube";
import {Obj} from "../renderer/Obj";

export class Hare extends Obj {

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
}