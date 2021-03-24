import {addAnimation, cubeMesh, object} from "../../core/Framework";
import { getGround} from "../ground/Ground";

export function addGroundSteps(targetLocation, targetRotation, stepsColor, animation) {

    let p = targetLocation;
    let steps = object(getGround());

    cubeMesh(steps, stepsColor)
        .scale(0.25, 0.1, 0.6)
        .pos(-0.2,-0.5,0)


    cubeMesh(steps, stepsColor)
        .scale(0.25, 0.1, 0.6)
        .pos(0.2,-0.5,0.0)

    steps.pos(p[0],p[1],p[2])
        .rot(0, targetRotation, 0)

    if (!animation)
        return

    let splashAnimationStart = Date.now();

    addAnimation(function(){
        let dt = (Date.now() - splashAnimationStart)/2000;
        if (dt > 1) {
            steps.obj.parent.remove(steps.obj);
            return true
        }
    })
}