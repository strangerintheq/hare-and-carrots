import {Object3D} from "three";
import {CellObjectType} from "../data/CellObjectType";
import {Carrot} from "./Carrot";
import {Bush1} from "./Bush1";
import {Tree2} from "./Tree2";
import {Tree1} from "./Tree1";
import {Obj} from "../renderer/Obj";
import {Poo} from "./Poo";
import {Bush2} from "./Bush2";
import {Poo1} from "./Poo1";
import {GroundSteps} from "./GroundSteps";
import {Cell} from "../data/Cell";

export class CellObject extends Obj{

    constructor(cell: Cell) {
        super();
        let o = cell.object;
        if (o === CellObjectType.CARROT)
            this.add(new Carrot());
        if (o === CellObjectType.BUSH1)
            this.add(new Bush1());
        if (o === CellObjectType.BUSH2)
            this.add(new Bush2());
        if (o === CellObjectType.TREE1)
            this.add(new Tree1());
        if (o === CellObjectType.TREE2)
            this.add(new Tree2());
        if (o === CellObjectType.POO)
            this.add(new Poo());
        if (o === CellObjectType.POO1)
            this.add(new Poo1());
        if (o === CellObjectType.POO_STEPS)
            this.add(new GroundSteps());
        this.rotation.set(0,cell.cellObjectRotation, 0);
    }

}