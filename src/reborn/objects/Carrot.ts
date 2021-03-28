import {green2, orange} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class Carrot extends Obj {
    constructor() {
        super();
        this.pos(0,0.5, 0);
        new Cube(this, orange).sc(0.3, 0.2, 0.3)
        new Cube(this, green2).sc(0.1, 1, 0.1)
    }
}