import {cubeMesh, object} from "../Framework";
import {red, white} from "../Materials";

export function createHare(target) {
    let  hare = object(target).pos(0, 1, 0);
    // body
    cubeMesh(hare, white).scale(0.8, 0.8, 0.8)
    // legs
    cubeMesh(hare, white).scale(0.7, 0.7, 0.7).pos(0,-0.2, 0);
    // ears
    cubeMesh(hare, white).scale(0.2, 0.6, 0.05).pos(0.15, .6, -0.3);
    cubeMesh(hare, white).scale(0.2, 0.6, 0.05).pos(-0.15, .6, -0.3);
    // tail
    cubeMesh(hare, white).scale(0.1, 0.1, 0.1).pos(0, -0.2, -0.45);
    // mouth
    cubeMesh(hare, red).scale(0.3, 0.1, 0.1).pos(0, -0.1, 0.45);
    return hare;
}