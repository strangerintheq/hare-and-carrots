import {blueClipped1, blueClipped2} from "../../core/Materials";
import {addAnimation, cubeMesh, object, scene} from "../../core/Framework";
import {getCell, isWater} from "../ground/Ground";

function createSplashEffect(h) {
    let material = h>6?blueClipped2:blueClipped1;
    let splash = object(scene);
    cubeMesh(splash, material)
        .scale(1.1, 0.1, 1.1)
        .pos(0,-0.2,0)
    return splash;
}

export function startSplashAnimation(targetLocation, targetRotation ) {
    let p = targetLocation;
    let cell = getCell(p);
    if (!isWater(cell))
        return;
    let splash = createSplashEffect(+cell[1])
        .pos(p[0],p[1],p[2]).rot(0, targetRotation, 0);
    let splashAnimationStart = Date.now();
    addAnimation(function(){
        let dt = (Date.now() - splashAnimationStart)/500;
        if (dt < 1) {
            splash.scale(0.8+dt*2, 1, 0.8+dt*2)
                .pos(p[0], 0.6-Math.abs(dt-0.5), p[2]);
        } else {
            splash.obj.parent.remove(splash.obj);
            return true
        }
    })
}