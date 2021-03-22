import {addAnimation,  cubeMesh, object, scene} from "../../core/Framework";
import {blueClipped1, blueClipped2, red, white} from "../../core/Materials";
import {cellElevation, clearCell, getCell, isWater, saveMapData, tryChangeMap} from "../ground/Ground";
import {checkHareIsNearSign} from "./Signs";
import {jumpSound} from "../../core/Audio";
import {hideBalloon, showBalloon} from "../../core/Balloon";

let currentLocation = restoreLocation();
let targetLocation = [...currentLocation];

let moveStartTime = 0;
let currentRotation = 0;
let targetRotation = 0;

export function getTargetLocation(){
    return targetLocation
}

let hare;

export function getHare(){
    return hare
}

export function createHare() {
     hare = object(scene).pos(0, 1, 0);
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

export function moveHareAnimation(): boolean {
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

function checkForActiveAction(p) {
    let cell = getCell([p[0],p[1],p[2]]);
    checkActiveAction(cell[0])

}

const actions = {
    C: '🥕',
    K: '🔑',
    S: '💩'
}

function doAction() {
    let p = targetLocation;
    hideBalloon();
    clearCell(p[0], p[2]);
    saveMapData()
}

function checkActiveAction(code) {
    const action = actions[code];
    if (!action)
        return
    showBalloon([20, 20], action, () => doAction())
}

function jump(p) {
    let dx = Math.sign(hare.obj.position.x - p.x);
    let dz = Math.sign(hare.obj.position.z - p.z);
    let x = hare.obj.position.x - dx;
    let z = hare.obj.position.z - dz;
    let loc = [x, 0, z];
    let nextCell = getCell(loc);
    let y = cellElevation(nextCell) + (isWater(nextCell) ? -0.1 : 1);
    targetLocation = [x, y, z];
    if (dx * dx + dz * dz !== 0)
        targetRotation = Math.atan2(-dx, -dz);
    moveStartTime = Date.now();
}

export function tryJump(p){
    if (moveStartTime !== 0)
        return
    jump(p);
    jumpSound()

    setTimeout(() => {
        startSplashAnimation();
    }, 50)

    setTimeout(() => {
        checkHareIsNearSign(targetLocation);
        checkForActiveAction(targetLocation);
        tryChangeMap(targetLocation);
        saveLocation();
    }, 200);
}

function createSplashEffect(h) {
    let material = h<-3?blueClipped2:blueClipped1;
    let splash = object(scene);
    cubeMesh(splash, material)
        .scale(1.1, 0.1, 1.1)
        .pos(0,-0.2,0)
    return splash;
}

export function startSplashAnimation( ) {
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

export function mirrorHarePosition(){

    if (Math.abs(currentLocation[0]) === 10)
        targetLocation[0] = currentLocation[0] = - Math.sign(currentLocation[0]) * 9;

    if (Math.abs(targetLocation[2]) === 10)
        targetLocation[2] = currentLocation[2] = - Math.sign(currentLocation[2]) * 9;
}

function angleLerp(a0,a1,t) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return a0 + (2*da % max - da)*t;
}

export function lerp(a, b, t) {
    return a + (b-a)*t
}

function saveLocation() {
    localStorage.setItem('hare-location', JSON.stringify(currentLocation))
}

function restoreLocation() {
    const locationData = localStorage.getItem('hare-location')
    return locationData ? JSON.parse(locationData) : [0, 0, 0]
}