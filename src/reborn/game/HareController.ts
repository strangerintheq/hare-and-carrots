
import {Obj} from "../renderer/Obj";
import {Hare} from "../objects/Hare";

export class HareController extends Obj {

    constructor() {
        super();
        this.pos(0,1,0)
        this.add(new Hare())
    }

    mirrorPosition(sectorHalfSize:number) {
        let s0 = sectorHalfSize - 1;
        if (Math.abs(this.position.x) === sectorHalfSize)
            this.position.x = - Math.sign(this.position.x) * s0;
        if (Math.abs(this.position.z) === sectorHalfSize)
            this.position.z = - Math.sign(this.position.z) * s0;
    }
}