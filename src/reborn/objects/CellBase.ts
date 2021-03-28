import {Object3D} from "three";
import {CellType} from "../data/CellType";
import {blue1, blue2, green} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class CellBase extends Obj {

    constructor(cell: CellType) {
        super();
        if (cell === CellType.OCEAN) {
            new Cube(this, blue2)
        }
        if (cell === CellType.WATER) {
            new Cube(this, blue1)
        }
        if (cell === CellType.GRASS) {
            new Cube(this, green)
        }
    }

}