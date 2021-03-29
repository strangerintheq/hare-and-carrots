import {Anim} from "../renderer/Anim";
import {Cube} from "../objects/Cube";
import {brown2} from "../../old/core/Materials";

export class PooAnimation extends Anim {

    private cubes = [...Array(3)]
        .map(() => {
            return new Cube(this, brown2).sc(0.2+Math.random()*0.1, 0.1, 0.2+Math.random()*0.1);
        });
    rnd = Math.random()

    protected play(dt: number): boolean {

        dt = Math.max(0, (dt-150)/300)

        if (dt < 1) {


            let y = 0.7-(dt-0.5)*(dt-0.5);

            this.cubes.forEach((cube,i) => {
                let a = this.rnd+ i/3*Math.PI*2
                let x = Math.cos(a)*dt
                let z = Math.sin(a)*dt
                cube.pos(x, y, z);

            })

            return true; // continue play
        }
        //else
            //this.parent.remove(this)
    }

}