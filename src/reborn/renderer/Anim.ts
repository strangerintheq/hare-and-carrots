import {Obj} from "./Obj";

export abstract class Anim extends Obj {

    protected startedAt = Date.now();

    playAnimation(now: number) : boolean {
        return this.play(now - this.startedAt);
    }

    protected abstract play(dt: number) : boolean;
}