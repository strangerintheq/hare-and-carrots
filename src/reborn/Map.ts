import SimplexNoise from 'simplex-noise'
import {Sector} from "./data/Sector";
import {Cell} from "./data/Cell";
import {CellType} from "./data/CellType";
import {CellObjectType} from "./data/CellObjectType";

const MAP_SEED_KEY = 'hare-seed';

export class Map {

    seed: string;
    noises: any = {};

    constructor() {
        this.seed = this.getSeed();
    }

    noisedValue(key:string, x, y) {
        if (!this.noises[key])
            this.noises[key] = new SimplexNoise(this.seed + key)
        return this.noises[key].noise2D(x, y)
    }

    getSeed() {
        let seed = localStorage.getItem(MAP_SEED_KEY);
        if (!seed)
            seed = Math.random().toString(36).substring(2);
        localStorage.setItem(MAP_SEED_KEY, seed);
        return seed;
    }

    clearSeed() {
        localStorage.removeItem(MAP_SEED_KEY)
        this.seed = this.getSeed();
        this.noises = {}
    }

    initSector(sector: Sector) {
        sector.forEachCell(cell => this.initCell(sector, cell))
    }

    private initCell(sector: Sector, cell: Cell) {
        cell.height = this.noisedValue(
            'terrain',
            cell.x/(sector.size-2)+sector.x,
            cell.y/(sector.size-2)+sector.y
        );
        cell.type = this.getCellTypeByHeight(cell.height);
        cell.object = this.getCellObject(cell, sector);
    }

    private getCellTypeByHeight(height: number): CellType {
        if (height < -0.5)
            return CellType.OCEAN
        if (height < 0)
            return CellType.WATER
        return CellType.GRASS
    }

    private getCellObject(cell: Cell, sector: Sector) : CellObjectType{
        if (cell.type === CellType.GRASS) {
            let x = cell.x + sector.x*(sector.size-2);
            let y = cell.y + sector.y*(sector.size-2);
            let all = Object.keys(CellObjectType);
            for (let i=1; i<all.length; i++)
                if (this.noisedValue(CellObjectType[i], x/5, y/5) > 0.8)
                    return i
        }

        return CellObjectType.NONE;
    }
}