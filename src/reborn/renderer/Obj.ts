import {Object3D} from "three";

export class Obj extends Object3D {

    sc(x: number, y: number=x, z: number=y) : Obj {
        this.scale.set(x,y,z)
        return this
    }

    pos(x: number, y: number=x, z: number=y) : Obj {
        this.position.set(x,y,z)
        return this
    }

    rot(x: number, y: number=x, z: number=y) : Obj {
        this.rotation.set(x,y,z)
        return this
    }

    rotY(v: number) : Obj {
        this.rotation.y = v
        return this
    }
}