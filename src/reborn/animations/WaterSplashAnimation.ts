import {Anim} from "./Anim";
import {Material, Object3D} from "three";
import {Cube} from "../objects/Cube";

export class WaterSplashAnimation extends Anim {

    cube: Object3D;

    constructor(material: Material) {
        super(500);
        this.cube = new Cube(this, material)
            .sc(1.1, 0.1, 1.1)
            .pos(0,0.2,0)

    }

    play(dt: number): boolean {

        if (dt < 1) {
            this.cube .scale.set(0.8+dt*2, 0.1, 0.8+dt*2);
            this.cube .position.set(0, 0.6-Math.abs(dt-0.5), 0);
            return true // continue play
        } else {
            this.parent.remove(this);
        }
    }

}