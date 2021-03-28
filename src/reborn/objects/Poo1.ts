import {Obj} from "../renderer/Obj";
import {Cube} from "./Cube";
import {brown2} from "../../old/core/Materials";


export class Poo1 extends Obj {

    constructor() {
        super();
        this.pos(0,0.6,0)
        new Cube(this, brown2)
            .sc(0.2, 0.3, 0.3)
    }
}