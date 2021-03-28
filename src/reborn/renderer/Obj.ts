import {Object3D} from "three";

export class Obj extends Object3D {

    sc(x: number, y: number, z: number) : Obj {
        this.scale.set(x,y,z)
        return this
    }

    pos(x: number, y: number, z: number) : Obj {
        this.position.set(x,y,z)
        return this
    }

    rot(x: number, y: number, z: number) : Obj {
        this.rotation.set(x,y,z)
        return this
    }
}