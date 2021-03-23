import {blueClipped1, blueClipped2} from "../../core/Materials";
import {addAnimation, cubeMesh, object, scene} from "../../core/Framework";
import {getCell, getGround, isWater} from "../ground/Ground";


export function startGroundStepsAnimation(targetLocation, targetRotation ) {
    let p = targetLocation;
    let cell = getCell(p);
    if (isWater(cell))
        return;
    let h = +cell[1];

    let material = h>6?blueClipped2:blueClipped1;

    let steps = object(getGround());

    cubeMesh(steps, material)
        .scale(0.25, 0.1, 0.6)
        .pos(-0.2,-0.5,0)


    cubeMesh(steps, material)
        .scale(0.25, 0.1, 0.6)
        .pos(0.2,-0.5,0.0)

    steps.pos(p[0],p[1],p[2])
        .rot(0, targetRotation, 0)

    let splashAnimationStart = Date.now();
    addAnimation(function(){
        let dt = (Date.now() - splashAnimationStart)/2000;
        if (dt < 1) {
            // splash.scale(0.8, 0.1, 0.8)
            //     .pos(p[0], 0.5+h*0.1, p[2]);
        } else {
            steps.obj.parent.remove(steps.obj);
            return true
        }
    })
}