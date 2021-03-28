import {CellType} from "./CellType";
import {CellObjectType} from "./CellObjectType";
import {Anim} from "../animations/Anim";
import { blueClipped1, blueClipped2} from "../../old/core/Materials";
import {WaterSplashAnimation} from "../animations/WaterSplashAnimation";

export class Cell {

    type: CellType;
    height: number;
    x: number;
    y: number;
    object?: CellObjectType;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getAnimation() : Anim | undefined {
        if (this.type === CellType.WATER)
            return new WaterSplashAnimation(blueClipped1)
        if (this.type === CellType.OCEAN)
            return new WaterSplashAnimation(blueClipped2)

        return undefined
    }
}