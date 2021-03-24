import {BoxGeometry, Material, Mesh, Object3D} from "three";

const cube = new BoxGeometry();

export class Cube extends Object3D {

    constructor(parent: Object3D, material: Material) {
        super();
        parent.add(this);
        this.add(new Mesh(cube, material))
    }

    sc(x: number, y: number, z: number) : Cube {
        this.scale.set(x,y,z)
        return this
    }

    pos(x: number, y: number, z: number) : Cube{
        this.position.set(x,y,z)
        return this
    }

    rot(x: number, y: number, z: number) : Cube{
        this.rotation.set(x,y,z)
        return this
    }
}
