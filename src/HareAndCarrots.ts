import {raycaster, threejs} from "./Framework";
import {inventory} from "./Inventory";
import {audio} from "./Audio";
import {cellElevetion, createGround, getCell, getGround, isWater} from "./ground/Ground";
import {groundData} from "./ground/Map";
import {createHare, moveHareAnimation, startSplashAnimation} from "./objects/Hare";
import {createClouds} from "./objects/Clouds";
import {checkHareIsNearSign} from "./signs/Signs";

let activeAnimations : Array<(t:number) => boolean> = [moveHareAnimation];

let three = threejs(t => {
    activeAnimations = activeAnimations.filter(play => !play(t))
});

createGround(groundData(), three.scene);
createClouds(three.scene, activeAnimations);
createHare(three.scene);
let sound = audio();
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

    startSplashAnimation(three.scene, activeAnimations);

    setTimeout(() => {
        nextMap(targetLocation)
        checkHareIsNearSign(targetLocation, hare, three.camera)
    }, 200);
}

function nextMap(p) {
    // let x = Math.abs(p[0]) === 10;
    // let y = Math.abs(p[2]) === 10;
    //
    // x && (mapLocation[1] += Math.sign(p[0]));
    // y && (mapLocation[0] += Math.sign(p[2]));
    //
    // if (x || y) {

        console.log('next map')
    // }
}





