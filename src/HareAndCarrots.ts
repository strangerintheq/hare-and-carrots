import * as THREE from 'three'
import {angleLerp, cubeMesh, lerp, object, threejs} from "./Framework";
import {inventory} from "./Inventory";
import {audio} from "./Audio";
import {cellElevetion, createGround, getCell, getGround, isWater} from "./ground/Ground";
import {groundData} from "./ground/Map";
import {blue1} from "./Materials";
import {createHare} from "./objects/Hare";
import {createClouds} from "./objects/Clouds";
import {checkHareIsNearSign} from "./signs/Signs";


let activeAnimations : Array<(t:number) => boolean> = [moveHareAnimation];
let targetLocation = [0, 1, 0];
let targetRotation = 0;
let currentLocation = [0, 0, 0];
let currentRotation = 0;
let moveStartTime = 0;
let mapLocation = [0, 0]
let three = threejs(t => {
    activeAnimations = activeAnimations.filter(play => !play(t))
});
createGround(groundData(), three.scene);
createClouds(three.scene, activeAnimations);
let hare = createHare(three.scene);
let sound = audio()
raycaster(handeRaycast);
inventory();

function handeRaycast(pt, obj){
    if (moveStartTime !== 0)
        return
    let p = obj.object.parent.position;
    let dx = Math.sign(hare.obj.position.x - p.x);
    let dz = Math.sign(hare.obj.position.z - p.z);
    let x = hare.obj.position.x - dx;
    let z = hare.obj.position.z - dz;
    let loc = [x, 0, z];
    let nextCell = getCell(loc);
    let y = cellElevetion(nextCell) + (isWater(nextCell) ? -0.1 : 1);

    targetLocation = [x, y, z];
    if (dx*dx + dz*dz !== 0)
        targetRotation = Math.atan2(-dx, -dz);
    moveStartTime = Date.now();
    sound.jump()

    startSplashAnimation(targetLocation, targetRotation);

    setTimeout(() => {
        nextMap(targetLocation)
        checkHareIsNearSign(targetLocation, hare, three.camera)
    }, 200);
}

function nextMap(p) {
    let x = Math.abs(p[0]) === 10;
    let y = Math.abs(p[2]) === 10;

    x && (mapLocation[1] += Math.sign(p[0]));
    y && (mapLocation[0] += Math.sign(p[2]));

    if (x || y) {

        console.log('next map')
    }
}

function moveHareAnimation(): boolean {
    let dt = (Date.now() - moveStartTime)/150;
    if (dt<1) {
        hare.pos(
            lerp(currentLocation[0], targetLocation[0], dt),
            lerp(currentLocation[1], targetLocation[1], dt) + 1. - Math.abs(dt-0.5)*2,
            lerp(currentLocation[2], targetLocation[2], dt)
        ).rot(
            0,
            angleLerp(currentRotation, targetRotation, dt),
            0
        );
    } else {
        moveStartTime = 0;
        currentLocation = targetLocation;
        currentRotation = targetRotation;
        hare.pos(...currentLocation)
            .rot(0, targetRotation, 0);
    }
    return false;
}

function createSplashEffect() {
    let splash = object(three.scene);
    cubeMesh(splash, blue1).scale(1.1, 0.1, 1.1).pos(0,-0.2,0)
    return splash;
}

function startSplashAnimation(pos, rot) {
    if (!isWater(getCell(pos)))
        return;
    let splash = createSplashEffect().pos(pos[0],pos[1],pos[2]).rot(0, rot, 0);
    let splashAnimationStart = Date.now();
    activeAnimations.push(function(){
        let dt = (Date.now() - splashAnimationStart)/500;
        if (dt < 1) {
            splash.scale(0.8+dt*2, 1, 0.8+dt*2).pos(
                currentLocation[0],
                0.6-Math.abs(dt-0.5),
                currentLocation[2]
            );
        } else {
            splash.remove();
            return true
        }
    })
}

export function raycaster(cb) {

    let cast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    let handle = e => {
        if (e.target.nodeName.toLowerCase() === "path")
            return
        mouse.x = ( e.clientX / innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / innerHeight ) * 2 + 1;
        cast.setFromCamera( mouse, three.camera );
        let intersects = cast.intersectObjects(getGround().possibleToMove, true);
        intersects[0] && cb(intersects[0].point, intersects[0])
    };

    addEventListener('click', handle);
    addEventListener('touchstart', e => handle(e.touches[0]));

}


