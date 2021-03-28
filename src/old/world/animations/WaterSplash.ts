import {addAnimation, cubeMesh, object} from "../../core/Framework";
import {getGround} from "../ground/Ground";
import * as THREE from 'three'


export function startWaterSplashAnimation(
    targetLocation:number[],
    targetRotation:number,
    material: THREE.Material
) {

    let p = targetLocation;

    let splash = object(getGround())
        .pos(p[0],p[1],p[2])
        .rot(0, targetRotation, 0);

    cubeMesh(splash, material)
        .scale(1.1, 0.1, 1.1)
        .pos(0,-0.2,0)

    let animationStart = Date.now();

    addAnimation(function(){
        let dt = (Date.now() - animationStart)/500;
        if (dt < 1) {
            splash.scale(0.8+dt*2, 1, 0.8+dt*2)
                .pos(p[0], 0.6-Math.abs(dt-0.5), p[2]);
        } else {
            splash.obj.parent.remove(splash.obj);
            return true
        }
    })
}