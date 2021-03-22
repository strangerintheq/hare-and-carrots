import {cubeMesh, object, svg, texture} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import {grassCell} from "./grassCell";
import {brown} from "../../core/Materials";

export function signCell(type) {
    return function (x, y, dy){
        grassCell(x,y,dy);
        let sign = object(getGround()).pos(y-10, 1+dy, x-10)
        cubeMesh(sign, brown).scale(0.1, 1, 0.1)
        let mat = texture(svg(100, 70, `
            <rect width="100" height="70" fill="hsl(33, 50%, 50%)" />
        ` + type.svg));
        cubeMesh(sign, [
            brown, brown, brown, brown, mat, brown
        ]).scale(1, 0.6, 0.15).pos(0,0.5,0)
        return sign
    }
}
