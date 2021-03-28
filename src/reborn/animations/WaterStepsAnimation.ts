import {Obj} from "../renderer/Obj";
import {Cube} from "../objects/Cube";
import {blue1} from "../../old/core/Materials";
import {Anim} from "../renderer/Anim";

export class WaterStepsAnimation extends Anim {

    constructor() {
        super();

        new Cube(this, blue1)
            .sc(0.25, 0.05, 0.6)
            .pos(-0.2,0.5,0)

        new Cube(this, blue1)
            .sc(0.25, 0.05, 0.6)
            .pos(0.2,0.5,0.0)
    }

    protected play(dt: number): boolean {
        if (dt>2000) {
            this.parent.remove(this)
            return false
        }

       else
           return true;
    }
}
