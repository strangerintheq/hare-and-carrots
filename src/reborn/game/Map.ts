import SimplexNoise from 'simplex-noise'
import {Sector} from "../data/Sector";
import {Cell} from "../data/Cell";
import {CellType} from "../data/CellType";
import {CellObjectType} from "../data/CellObjectType";
import {getSeed} from "../storage/SeedStorage";

export class Map {

    seed: string;
    noises: any;

    noisedValue(key:string, x, y) {
        if (!this.noises[key])
            this.noises[key] = new SimplexNoise(this.seed + key)
        return this.noises[key].noise2D(x, y)
    }

    initSector(sector: Sector) {
        this.seed = getSeed();
        this.noises = {};
        sector.forEachCell(cell => this.initCell(sector, cell))
    }

    private initCell(sector: Sector, cell: Cell) {
        let x = cell.x+sector.x*(sector.size-2);
        let y = cell.y+sector.y*(sector.size-2);
        cell.height = this.noisedValue('terrain1', x/40, y/40)*0.8;
        cell.height += this.noisedValue('terrain2', x/10, y/10)*0.2;
        cell.height = Math.floor(cell.height*10)/10
        if (cell.height <0)
            cell.height -= 0.15
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

            for (let i=7; i<all.length; i++)
                if (this.noisedValue(CellObjectType[i], x, y) > 0.9)
                    return i
        }

        return CellObjectType.NONE;
    }
}