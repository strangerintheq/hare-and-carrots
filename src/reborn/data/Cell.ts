import {CellType} from "./CellType";
import {CellObjectType} from "./CellObjectType";
import {Anim} from "../animations/Anim";
import {blue1} from "../../core/Materials";
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
            return new WaterSplashAnimation(blue1)
        return undefined
    }
}