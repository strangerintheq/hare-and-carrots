import {CellType} from "./CellType";
import {CellObjectType} from "./CellObjectType";

export class Cell {

    type: CellType;
    height: number;
    x: number;
    y: number;
    object?: CellObjectType;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}