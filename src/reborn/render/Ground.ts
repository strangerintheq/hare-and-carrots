import {Object3D} from "three";
import {Cell} from "../data/Cell";
import {CellBase} from "./CellBase";
import {CellObject} from "./CellObject";
import {Sector} from "../data/Sector";

export class Ground extends Object3D {

    constructor(sector:Sector) {
        super();
        sector.forEachCell((cell: Cell) => {
            const cellGroup = new CellBase(cell.type);
            const h = Math.max(0, cell.height);
            cellGroup.position.set(cell.x, h, cell.y);
            cell.object && cellGroup.add(new CellObject(cell.object));
            this.add(cellGroup);
        })
    }



}