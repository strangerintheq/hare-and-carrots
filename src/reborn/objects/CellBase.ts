import {Object3D} from "three";
import {CellType} from "../data/CellType";
import {blue1, blue2, green} from "../../core/Materials";
import {Cube} from "./Cube";

export class CellBase extends Object3D {

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