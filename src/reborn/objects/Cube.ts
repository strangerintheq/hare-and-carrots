import {BoxGeometry, Material, Mesh} from "three";
import {Obj} from "../renderer/Obj";

const cube = new BoxGeometry();

export class Cube extends Obj {

    readonly mesh: Mesh;

    constructor(parent: Obj, material: Material|Material[]) {
        super();
        parent.add(this);
        let mesh = this.mesh = new Mesh(cube, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh)
    }

    mat(material: Material) {
        this.mesh.material = material
    }
}
