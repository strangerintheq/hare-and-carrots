import {Map} from "./Map";
import {Sector} from "./data/Sector";
import {Game} from "./Game";

const sectorSize = 21;
const mapCursor = {x:0, y:0};

const map = new Map();
const sector = new Sector(mapCursor.x, mapCursor.y, sectorSize);
map.initSector(sector);

const game = new Game();
game.setMapSector(sector);
game.render();
