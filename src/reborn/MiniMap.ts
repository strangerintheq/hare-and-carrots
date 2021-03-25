import {Sector} from "./data/Sector";
import {Map} from "./Map";
import {Cell} from "./data/Cell";
import {CellType} from "./data/CellType";

let s = 2;

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
                map.initSector(sector);
                this.fillCells(sector)
                this.drawSectorIndex(sector)
            }
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(-10 * s, -10 * s, 21 * s, 21 * s)
        }
    }

    fillCells(sector: Sector) {
        sector.forEachCell((cell: Cell) => {
            this.ctx.fillStyle = this.getCellColor(cell);
            const x = cell.x + sector.size * sector.x;
            const y = cell.y + sector.size * sector.y;
            this.ctx.fillRect(x * s, y * s, s, s);
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
        if (cell.type === CellType.WATER || cell.type === CellType.OCEAN)
            return 'blue'
        return 'green';
    }
}