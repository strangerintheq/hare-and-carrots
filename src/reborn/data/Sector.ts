import {Cell} from "./Cell";

export class Sector {

    x: number;
    y: number;
    size: number;
    halfSize: number;
    cells: Cell[][];


    constructor(x: number, y: number, size: number) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.halfSize = (size-1)/2
        this.cells = [...Array(size)].map((_, y) => {
            return [...Array(size)].map((_, x) => {
                return new Cell(x - this.halfSize, y - this.halfSize);
            });
        });
    }

    forEachCell(fn: (cell:Cell) => void) {
        this.cells.forEach(row => row.forEach(fn));
    }

    isOnEdge(cell:Cell) {
        return Math.abs(cell.x) === this.halfSize
            || Math.abs(cell.y) === this.halfSize
    }
}