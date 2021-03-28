import {Obj} from "../renderer/Obj";
import {Cube} from "../objects/Cube";
import {white} from "../../old/core/Materials";
import {Anim} from "../renderer/Anim";
import {Cell} from "../data/Cell";

export class DialogCloud extends Anim {

    private c1: Obj;
    private c2: Obj;
    private c3: Obj;

    private isPlaying : boolean = true;

    protected play(dt: number): boolean {
        dt /= 1000
        let t1 = Math.min(dt*10,1);

        let y1 = Math.sin(dt*1.3)*0.1;
        this.c1.pos(0,y1*t1,0)


        let y2 = Math.sin(dt*1.2)*0.1+0.3;
        this.c2.pos(0,y2*t1,0);

        let y3 = Math.sin(dt*1.1)*0.1+1.2;
        let x3 = Math.sin(dt*0.8)*0.05+0.3;

        this.c3.pos(x3,y3*t1,0)
            .rot(0,Math.sin(dt*0.8)*0.1,0)
            .sc(Math.min(dt*10,1.2), t1,0.05);

        return this.isPlaying
    }

    constructor() {
        super();

        let g = new Obj()
            .pos(0,2.5,0)
            .rot(0,0.5, 0)

        this.add(g)

        this.c1 = new Cube(g, white)
            .sc(0.1,0.1,0.05)

        this.c2 = new Cube(g, white)
            .sc(0.3,0.3,0.05)

        this.c3 = new Cube(g, white)
            .sc(1.2,1,0.05)
    }

    hide() : DialogCloud{
        this.parent && this.parent.remove(this);
        this.isPlaying = false;
        return this
    }

    showAt(cell:Cell): DialogCloud {
        this.startedAt = Date.now();
        this.pos(cell.x,cell.height, cell.y);
        this.isPlaying = true;
        return this
    }
}