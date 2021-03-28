import {Object3D} from "three";
import {Cell} from "../data/Cell";
import {CellBase} from "../objects/CellBase";
import {CellObject} from "../objects/CellObject";
import {Sector} from "../data/Sector";

export class Ground extends Object3D {

    sector: Sector;
    possibleToMoveCells = []

    constructor(sector:Sector) {
        super();
        this.sector = sector;
        sector.forEachCell((cell: Cell) => {
            const cellBase = new CellBase(cell.type);
            cellBase.traverse((o) => o['isMesh'] && this.possibleToMoveCells.push(o));
            const h = Math.max(0, cell.height);
            cellBase.position.set(cell.x, h, cell.y);
            cell.object && cellBase.add(new CellObject(cell.object));
            this.add(cellBase);
        })
    }

    getPossibleToMoveCells() : CellBase[] {
        return this.possibleToMoveCells;
    }

    getCell(x: number, y: number):Cell {
        return this.sector.cells[y+this.sector.halfSize][x+this.sector.halfSize];
    }
}