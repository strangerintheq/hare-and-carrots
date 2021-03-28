import {Object3D} from "three";
import {CellObjectType} from "../data/CellObjectType";
import {Carrot} from "./Carrot";
import {Bush1} from "./Bush1";
import {Tree2} from "./Tree2";
import {Tree1} from "./Tree1";
import {Obj} from "../renderer/Obj";
import {Poo} from "./Poo";
import {Bush2} from "./Bush2";

export class CellObject extends Obj{

    constructor(cell: CellObjectType) {
        super();
        if (cell === CellObjectType.CARROT)
            this.add(new Carrot());
        if (cell === CellObjectType.BUSH1)
            this.add(new Bush1());
        if (cell === CellObjectType.BUSH2)
            this.add(new Bush2());
        if (cell === CellObjectType.TREE1)
            this.add(new Tree1());
        if (cell === CellObjectType.TREE2)
            this.add(new Tree2());
        if (cell === CellObjectType.POO)
            this.add(new Poo());
    }

}