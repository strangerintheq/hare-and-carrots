import {Sector} from "../data/Sector";
import {Map} from "./Map";
import {Cell} from "../data/Cell";
import {CellType} from "../data/CellType";
import {restoreSector} from "../storage/SectorStorage";

let s = 3;

export class MiniMap {

    private readonly empty: Sector = new Sector(0, 0, 21);
    private readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.empty = new Sector(0, 0, 21)
        const el = document.createElement('div');
        el.innerHTML = `<canvas style="position: fixed; right: 5px;bottom: 5px;" width="200" height="200"></canvas>`;
        this.ctx = el.querySelector('canvas')
            .getContext('2d');
        this.ctx.translate(100, 100);
        this.ctx.rotate(Math.PI / 4);
        document.body.append(el);
    }

    renderMiniMap(mapCursor, map: Map) {
        this.ctx.clearRect(-1e5, -1e5, 2e5, 2e5)
        for (let y = -3; y <= 3; y++) {
            for (let x = -3; x <= 3; x++) {
                let sector = new Sector(x + mapCursor.x, y + mapCursor.y, 21);
                restoreSector(sector);
                this.fillCells(sector,x,y)
               // this.drawSectorIndex(sector)
            }
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(-10 * s, -10 * s, 21 * s, 21* s)
        }
    }

    fillCells(sector: Sector,x,y) {
        sector.forEachCell((cell: Cell) => {
            this.ctx.fillStyle = this.getCellColor(cell);
            const x1 = cell.x + (sector.size-2) * x;
            const y1 = cell.y + (sector.size-2) * y;
            this.ctx.fillRect(x1 * s, y1 * s, s, s);
        })

    }

    randomGray() {
        const rnd = 50 + Math.random() * 150
        return `rgb(${rnd}, ${rnd}, ${rnd})`;
    }

    drawSectorIndex(sector: Sector) {
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
            sector.x + ' ' + sector.y,
            sector.size * sector.x * s,
            sector.size * sector.y * s
        )
    }

    private getCellColor(cell: Cell) {
        if (cell.type === CellType.WATER)
            return 'blue'
        if (cell.type === CellType.OCEAN)
            return 'darkblue'
        if (cell.type === CellType.GRASS)
            return 'green'
        let c = Math.random()*256
        return `rgb(${c},${c},${c})`;
    }
}