import {Obj} from "../renderer/Obj";
import {Cube} from "./Cube";
import {brown2} from "../../old/core/Materials";


export class Poo1 extends Obj {

    constructor() {
        super();
        this.pos(0,0.5,0)
        new Cube(this, brown2)
            .pos(rnd1(), 0.0, rnd1())
            .sc(rnd(), 0.1, rnd())
        new Cube(this, brown2)
            .pos(rnd1(), 0.0, rnd1())
            .sc(rnd(), 0.1, rnd())
        new Cube(this, brown2)
            .pos(rnd1(), 0.0, rnd1())
            .sc(rnd(), 0.1, rnd())
    }


}

function rnd(){
    return Math.random()*0.1+0.2
}


function rnd1(){
    return Math.random()*0.7-0.35
}