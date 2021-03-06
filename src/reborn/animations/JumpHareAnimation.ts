import {Anim} from "../renderer/Anim";
import {HareController} from "../game/HareController";
import {Vector3} from "three";
import {Cell} from "../data/Cell";

export class JumpHareAnimation extends Anim {

    private readonly hare: HareController;

    private readonly sourceRotation: number;
    private readonly targetRotation: number;
    private readonly sourcePosition: Vector3 = new Vector3();
    private readonly targetPosition: Vector3 = new Vector3();

    constructor(hare: HareController, cell: Cell, targetRotation: number) {
        super()
        this.hare = hare;
        this.sourcePosition.copy(hare.position);
        this.targetPosition.set(cell.x, cell.height+1, cell.y);
        this.sourceRotation = hare.rotation.y;
        this.targetRotation = targetRotation;
    }

    play(dt): boolean {
        dt /= 150;
        if (dt < 1) {
            let p0 = this.sourcePosition;
            let p1 = this.targetPosition;
            let x = lerp(p0.x, p1.x, dt);
            let y = lerp(p0.y, p1.y, dt) + 1.0 - Math.abs(dt - 0.5)*2;
            let z = lerp(p0.z, p1.z, dt);
            this.hare.pos(x, y, z);
            let y1 = angleLerp(this.sourceRotation, this.targetRotation, dt);
            this.hare.rot(0, y1, 0);
            return true // continue play
        } else {
            this.hare.position.copy(this.targetPosition)
            this.hare.rot(0, this.targetRotation, 0);
        }
    }
}

function angleLerp(a0,a1,t) {
    const max = Math.PI*2;
    const da = (a1 - a0) % max;
    return a0 + (2*da % max - da)*t;
}

function lerp(a, b, t) {
    return a + (b-a)*t
}

