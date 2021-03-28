import {Obj} from "../renderer/Obj";
import {Cube} from "./Cube";
import {brown2} from "../../old/core/Materials";


export class Poo1 extends Obj {

    constructor() {
        super();
        this.pos(0,0.5,0)
        new Cube(this, brown2)
            .sc(1, 0.1, 1)
    }
}