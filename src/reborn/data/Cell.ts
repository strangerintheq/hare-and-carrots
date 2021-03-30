import {CellType} from "./CellType";
import {CellObjectType} from "./CellObjectType";
import {Anim} from "../renderer/Anim";
import {blueClipped1, blueClipped2} from "../../old/core/Materials";
import {WaterSplashAnimation} from "../animations/WaterSplashAnimation";
import {PooAnimation} from "../animations/PooAnimation";
import {HareState} from "./HareState";
import {WaterStepsAnimation} from "../animations/WaterStepsAnimation";

export class Cell {

    type: CellType;
    height: number;
    x: number;
    y: number;
    object?: CellObjectType;
    cellObjectRotation = 0;
    updateFn:Function;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getAnimation() : Anim | undefined {
        if (this.type === CellType.WATER)
            return new WaterSplashAnimation(blueClipped1)
        if (this.type === CellType.OCEAN)
            return new WaterSplashAnimation(blueClipped2)
        if (this.object === CellObjectType.POO)
            return new PooAnimation()
        return undefined
    }

    updateCell() {
        this.updateFn();
    }

    isWater() {
        return this.type === CellType.OCEAN || this.type === CellType.WATER
    }

    handleCellLogic(hareState: HareState) :Anim|undefined{

        let cell = this;
        if (cell.object === CellObjectType.POO) {
            cell.object = CellObjectType.POO1;
            setTimeout(() => this.updateCell(), 200)
            hareState.pooStepsCount = 5;
        }
        if (cell.isWater()) {
            hareState.inWater = true;
            hareState.pooStepsCount = 0;
        }
        if (hareState.pooStepsCount && cell.object === CellObjectType.NONE) {
            cell.object = CellObjectType.POO_STEPS
            cell.cellObjectRotation = hareState.rotation;
            this.updateCell()
            hareState.pooStepsCount--;
        }

        if (cell.type === CellType.GRASS) {
            if (hareState.inWater)
                hareState.wetTimestamp = Date.now();
            hareState.inWater = false;
            if (Date.now() - hareState.wetTimestamp < 2000) {
                let waterSteps = new WaterStepsAnimation();
                waterSteps.rot(0, hareState.rotation, 0)
                waterSteps.pos(cell.x, cell.height, cell.y)
                return waterSteps
            }
        }
    }
}