import {green2, green3} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class Bush2 extends Obj {
    constructor() {
        super();

        new Cube(this, green2)
            .sc(0.9,1.2,0.9)
            .pos(0,1,0)
    }
}