import * as THREE from 'three'

const planes = clippingPlanes();

export const green = hsl(90, 50, 70);
export const green2 = hsl(90, 50, 60);
export const green3 = hsl(90, 50, 30);
export const white = hsl(0, 0, 100);
export const brown = hsl(33, 50, 50);
export const blue = hsl(222, 50, 50);
export const blue1 = hsl(222, 50, 60, true);
export const gray = hsl(44, 0, 30);
export const gold = hsl(50, 70, 60);
export const red = hsl(0, 100, 50);
export const orange = hsl(25, 100, 50);

function clippingPlanes() {
    return [
        [0, 0, 1],
        [0, 0, -1],
        [1, 0, 0],
        [ -1, 0, 0]
    ].map(el => new THREE.Plane( new THREE.Vector3( ...el), 10.4 ))
}

function hsl(h, s, l, clip?) {
    let color = new THREE.Color(`hsl(${h||0}, ${s||50}%, ${l||50}%)`);
    return new THREE.MeshLambertMaterial({
        color,
        clippingPlanes: clip ? planes : [],
        clipShadows: true
    });
}