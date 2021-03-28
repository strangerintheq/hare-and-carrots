import {Obj} from "../renderer/Obj";
import {Cube} from "./Cube";
import {brown2} from "../../old/core/Materials";

export class PooSteps extends Obj {

    constructor() {
        super();

        new Cube(this, brown2)
            .sc(0.25, 0.1, 0.6)
            .pos(-0.2,0.5,0)

        new Cube(this, brown2)
            .sc(0.25, 0.1, 0.6)
            .pos(0.2,0.5,0.0)
    }
}

