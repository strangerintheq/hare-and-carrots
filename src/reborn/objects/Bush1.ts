import {green3} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class Bush1 extends Obj {
    constructor() {
        super();

        new Cube(this, green3)
            .pos(0,1,0)
    }
}