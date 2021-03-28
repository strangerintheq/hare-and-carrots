import {Sector} from "../data/Sector";

const MAP_SECTORS_INDEX_KEY = 'hare-sector-index';

export function restoreSector(sector: Sector) {
    let k = key(sector);
    let sectorData = localStorage.getItem(k);
    if (sectorData)
        return deserialize(sectorData);
}

export function saveSector(sector: Sector) {
    localStorage.setItem(key(sector), serialize(sector))
    let index = JSON.parse(localStorage.getItem(MAP_SECTORS_INDEX_KEY) || "[]");
    index.push(key(sector))
    localStorage.setItem(MAP_SECTORS_INDEX_KEY, index);
}

export function clearAllSectors() {

}

function key(sector:Sector) {
    return 'hare-map-sector--' + JSON.stringify([sector.x, sector.y]);
}

function serialize(sector: Sector) {
    return "";
}

function deserialize(sectorData: string): Sector {
    let sector;
    return sector;
}