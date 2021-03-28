import {Anim} from "../renderer/Anim";
import {Material} from "three";
import {Cube} from "../objects/Cube";
import {Obj} from "../renderer/Obj";

export class WaterSplashAnimation extends Anim {

    cube: Obj;

    constructor(material: Material) {
        super();
        this.cube = new Cube(this, material)
            .sc(0, 0, 0)
    }

    play(dt: number): boolean {
        dt = Math.max(0, (dt - 100)/ 500);
        if (dt < 1) {
            let c = 0 + dt*3;
            this.cube.sc(c, 0.1, c);
            this.cube.pos(0, 0.45-Math.abs(dt-0.3)*0.5, 0);
            return true; // continue play
        } else {
            this.parent.remove(this);
        }
    }

}