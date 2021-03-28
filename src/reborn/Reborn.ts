import {Map} from "./game/Map";
import {Sector} from "./data/Sector";
import {Game} from "./game/Game";
import {Cell} from "./data/Cell";
import {MiniMap} from "./game/MiniMap";
import {SvgButton} from "./gui/SvgButton";
import {clearSeed} from "./storage/SeedStorage";

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

requestAnimationFrame(function update(t: number) {
    game.render();
    requestAnimationFrame(update);
})

new SvgButton(`
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M16.3 5h.7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h5l-2.82 -2.82m0 5.64l2.82 -2.82" transform="rotate(-45 12 12)" />
`, () => {
    clearSeed();
    init();
})