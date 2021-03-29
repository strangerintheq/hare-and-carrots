import {Sector} from "../data/Sector";

const MAP_SECTORS_INDEX_KEY = 'hare-sector-index';

export function restoreSector(sector: Sector):boolean {
    let sectorData = localStorage.getItem(key(sector));
    if (sectorData) {
        deserialize(sectorData, sector);
        return true
    }
}

export function saveSector(sector: Sector) {
    localStorage.setItem(key(sector), serialize(sector))
    let index = JSON.parse(localStorage.getItem(MAP_SECTORS_INDEX_KEY) || "{}");
    index[key(sector)] = 1
    localStorage.setItem(MAP_SECTORS_INDEX_KEY, JSON.stringify(index));
}

export function clearAllSectors() {
    let index = JSON.parse(localStorage.getItem(MAP_SECTORS_INDEX_KEY) || "{}");
    Object.keys(index).forEach(sect => localStorage.removeItem(sect));
    localStorage.removeItem(MAP_SECTORS_INDEX_KEY)
}

function key(sector:Sector) {
    return 'hare-map-sector--' + JSON.stringify([sector.x, sector.y]);
}

function serialize(sector: Sector)  {
    return JSON.stringify(sector.cells.map(r => {
        return r.map(c => {
            return {
                h: c.height,
                r: c.cellObjectRotation,
                o: c.object,
                t: c.type
            }
        });
    }));
}

function deserialize(sectorData: string, sector: Sector) {
    const data = JSON.parse(sectorData)
    sector.forEachCell(c => {
        let el = data[c.y+sector.halfSize][c.x+sector.halfSize];
        c.height = el.h
        c.cellObjectRotation = el.r;
        c.type = el.t
        c.object = el.o;
    })
}