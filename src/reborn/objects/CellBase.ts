import {Object3D} from "three";
import {CellType} from "../data/CellType";
import {blue1, blue2, brown1, green} from "../../old/core/Materials";
import {Cube} from "./Cube";
import {Obj} from "../renderer/Obj";

export class CellBase extends Obj {

    constructor(cell: CellType) {
        super();
        if (cell === CellType.OCEAN) {
            new Cube(this, blue2)
                .sc(1,0.8,1)
                .pos(0, -0.1, 0)
        }
        if (cell === CellType.WATER) {
            new Cube(this, blue1)
                .sc(1,0.8,1)
                .pos(0, -0.1, 0)
        }
        if (cell === CellType.GRASS) {
            new Cube(this, green)
                .sc(1,0.1,1)
                .pos(0, 0.4 , 0)
            new Cube(this, brown1)
                .sc(1,0.9,1)
                .pos(0, -0.1, 0)
        }
    }

}