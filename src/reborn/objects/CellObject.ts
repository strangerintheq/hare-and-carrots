import {Object3D} from "three";
import {CellObjectType} from "../data/CellObjectType";
import {Carrot} from "./Carrot";
import {Bush1} from "./Bush1";
import {Tree2} from "./Tree2";
import {Tree1} from "./Tree1";

export class CellObject extends Object3D{

    constructor(cell: CellObjectType) {
        super();
        if (cell === CellObjectType.CARROT)
            this.add(new Carrot());
        if (cell === CellObjectType.BUSH1)
            this.add(new Bush1());
        if (cell === CellObjectType.TREE1)
            this.add(new Tree1());
        if (cell === CellObjectType.TREE2)
            this.add(new Tree2());
    }

}