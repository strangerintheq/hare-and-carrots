import {BoxGeometry, Material, Mesh} from "three";
import {Obj} from "../renderer/Obj";

const cube = new BoxGeometry();

export class Cube extends Obj {

    constructor(parent: Obj, material: Material) {
        super();
        parent.add(this);
        let mesh = new Mesh(cube, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh)
    }


}
