import {Anim} from "./Anim";
import {Material} from "three";
import {Cube} from "../objects/Cube";

export class WaterSplashAnimation extends Anim {

    constructor(material: Material) {
        super(500);
        new Cube(this, material)
            .sc(1.1, 0.1, 1.1)
            .pos(0,0.2,0)

    }

    play(dt: number): boolean {

        if (dt < 1) {
            this.scale.set(0.8+dt*2, 1, 0.8+dt*2);
            this.position.set(0, 0.6-Math.abs(dt-0.5), 0);
            return true // continue play
        } else {
            this.parent.remove(this);
        }
    }

}