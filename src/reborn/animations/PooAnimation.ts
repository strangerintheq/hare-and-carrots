import {Anim} from "../renderer/Anim";
import {Cube} from "../objects/Cube";
import {brown2} from "../../old/core/Materials";

export class PooAnimation extends Anim {

    private cube = new Cube(this, brown2);

    protected play(dt: number): boolean {

        dt = Math.max(0, (dt-150)/200)
        if (dt < 1) {
            let c =  dt;
            this.cube.sc(c, 0.1, c);
            this.cube.pos(0, 0.5-Math.abs(dt-0.5)*0.2, 0);
            return true; // continue play
        }
        else
            this.parent.remove(this)
    }

}