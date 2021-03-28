import {Anim} from "../renderer/Anim";
import {Material} from "three";
import {Cube} from "../objects/Cube";
import {Obj} from "../renderer/Obj";

export class WaterSplashAnimation extends Anim {

    cube: Obj;

    constructor(material: Material) {
        super();
        this.cube = new Cube(this, material)
            .sc(1.1, 0.1, 1.1)
            .pos(0,0.2,0)
    }

    play(dt: number): boolean {
        dt /= 500;
        if (dt < 1) {
            let c = 0.8 + dt*2;
            this.cube.sc(c, 0.1, c);
            this.cube.pos(0, 0.6-Math.abs(dt-0.5), 0);
            return true; // continue play
        } else {
            this.parent.remove(this);
        }
    }

}