import { brown2} from "../../core/Materials";
import {addAnimation, cubeMesh, object, scene} from "../../core/Framework";
import {getGround} from "../ground/Ground";


export function startPooSplashAnimation(targetLocation:number[]) {
    let p = targetLocation;
    let splash = object(getGround())
        .pos(p[0],p[1],p[2]);

    cubeMesh(splash, brown2)
        .scale(1.1, 0.1, 1.1)
        .pos(0, -0.5,0)

    let splashAnimationStart = Date.now();

    addAnimation(function(){
        let dt = (Date.now() - splashAnimationStart)/500;
        if (dt < 1) {
            splash.scale(0.8+dt*0.2, 1, 0.8+dt*0.2);
        } else {
            return true
        }
    })
}