import {Map} from "./Map";
import {Sector} from "./data/Sector";
import {Game} from "./Game";
import {Cell} from "./data/Cell";
import {MiniMap} from "./MiniMap";

const sectorSize = 21;
const mapCursor = {x:0, y:0};

const miniMap = new MiniMap()
const game = new Game();
const map = new Map();
init();

function init() {
    let sector = new Sector(mapCursor.x, mapCursor.y, sectorSize);
    map.initSector(sector);
    game.setMapSector(sector);
    miniMap.renderMiniMap(mapCursor, map);
}

addEventListener('change-sector', e => {
    //@ts-ignore
    let cell : Cell = e.detail;
    mapCursor.x += (cell.x/10)|0;
    mapCursor.y += (cell.y/10)|0;
    init();
})

addEventListener('resize', () => game.resize())

requestAnimationFrame(function update(){
    game.render();
    requestAnimationFrame(update)
})
