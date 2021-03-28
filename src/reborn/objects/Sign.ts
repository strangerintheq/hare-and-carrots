import {svg, texture} from "../../old/core/Framework";
import {brown1} from "../../old/core/Materials";
import {Obj} from "../renderer/Obj";
import {Cube} from "./Cube";

export class Sign extends Obj {

    constructor(icon: string) {
        super()

        new Cube(this, brown1)
            .sc(0.1, 1, 0.1)

        let mat = texture(svg(100, 70, `
            <rect width="100" height="70" fill="hsl(33, 50%, 50%)" />
        ` + icon));

        let materials = [
            brown1, brown1, brown1, brown1, mat, brown1
        ];

        new Cube(this, materials)
            .sc(1, 0.6, 0.15)
            .pos(0,0.5,0)
    }
}