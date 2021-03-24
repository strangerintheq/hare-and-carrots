import {Object3D} from "three";
import {Cell} from "../data/Cell";
import {CellBase} from "./CellBase";
import {CellObject} from "./CellObject";
import {Sector} from "../data/Sector";

export class Ground extends Object3D {
    private sector: Sector;

    constructor(sector:Sector) {
        super();
        this.sector = sector;
        sector.forEachCell((cell: Cell) => {
            const cellBase = new CellBase(cell.type);
            const h = Math.max(0, cell.height);
            cellBase.position.set(cell.x, h, cell.y);
            cell.object && cellBase.add(new CellObject(cell.object));
            this.add(cellBase);
        })
    }


    getPossibleToMoveCells() : CellBase[]{
        return this.children;
    }

    getCell(x: number, y: number):Cell {
        return this.sector.cells[y+this.sector.halfSize][x+this.sector.halfSize];
    }
}