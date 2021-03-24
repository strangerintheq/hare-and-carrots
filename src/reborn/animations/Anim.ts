import {Object3D} from "three";

export abstract class Anim extends Object3D{

    protected startedAt = Date.now();
    protected duration: number;

    protected constructor(duration:number) {
        super();
        this.duration = duration;
    }

    playAnimation():boolean{
        return this.play((Date.now() - this.startedAt)/this.duration);
    }

    protected abstract play(dt: number) : boolean;
}