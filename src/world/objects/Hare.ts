import { cubeMesh, object, scene} from "../../core/Framework";
import {blue1, blueClipped1, blueClipped2, brown1, brown2, red, white} from "../../core/Materials";
import {cellElevation, clearCell, getCell, isWater, saveMapData, tryChangeMap} from "../ground/Ground";
import {checkHareIsNearSign} from "./Signs";
import {jumpSound} from "../../core/Audio";
import {hideBalloon, showBalloon} from "../../core/Balloon";
import {startWaterSplashAnimation} from "../animations/WaterSplash";
import {addGroundSteps} from "../animations/GroundSteps";
import {startPooSplashAnimation} from "../animations/PooSplash";

const LOCATION_KEY = 'hare-location';

let currentLocation = restoreLocation();

let moveStartTime = 0;
let currentRotation = 0;
let targetRotation = 0;
let wetTimestamp = 0;
let hareInWater = false;
let hareIsBrown = 0;

let targetLocation = [...currentLocation];
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
    let w = isWater(nextCell);
    let y = cellElevation(nextCell) * (w ? -1 : 1) + (w ? 0.55 : 1);
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

    let cell = getCell(targetLocation);


    let nextCellIsWater = isWater(cell);
    if (hareInWater && !nextCellIsWater) {
        wetTimestamp = Date.now();
    }

    hareInWater = nextCellIsWater;

    nextCellIsWater && setTimeout(() => {
        const material = +cell[1]>6?blueClipped2:blueClipped1
        startWaterSplashAnimation(targetLocation, targetRotation, material);
    }, 50)

    setTimeout(() => {

        tryChangeMap(currentLocation);
        checkHareIsNearSign(currentLocation);
        checkForActiveAction(currentLocation);
        saveLocation();

        if (nextCellIsWater)
            return

        if (Date.now() - wetTimestamp < 3000)
            addGroundSteps(currentLocation, targetRotation, blue1, true)

        if (hareIsBrown) {
            hareIsBrown = Math.max(0, hareIsBrown - 1);
            addGroundSteps(currentLocation, targetRotation, brown2, false)
        }

        if (cell[0] === 'S') {
            clearCell(targetLocation[0], targetLocation[2]);
            hareIsBrown = 5;
            startPooSplashAnimation(targetLocation)
            saveMapData()
        }


    }, 200);
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
    localStorage.setItem(LOCATION_KEY, JSON.stringify(currentLocation))
}

function restoreLocation() {
    const locationData = localStorage.getItem(LOCATION_KEY)
    return locationData ? JSON.parse(locationData) : [0, 1, 0]
}

export function clearLocation(){
    localStorage.removeItem(LOCATION_KEY)
}