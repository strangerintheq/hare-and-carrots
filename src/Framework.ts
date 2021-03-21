import * as THREE from 'three'
import {getGround} from "./ground/Ground";
import {checkHareIsNearSign} from "./signs/Signs";

let activeAnimations : Array<(t:number) => boolean> = [];

export function addAnimation(a:(t:number) => boolean):void {
    activeAnimations.push(a)
}

let planes;

function getClippingPlanes(){
    if (!planes)
        planes = clippingPlanes();
    return planes
}


let cube = new THREE.BoxGeometry(1, 1, 1);

let renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(new THREE.Color("hsl(34, 50%, 70%)"));
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

let s = 10;
export const camera = new THREE.OrthographicCamera(-s*aspect(), s*aspect(), s, -s, 0.1, 100);

camera.position.set(15, 15, 15);
camera.lookAt(0,0,0)

//let controls = new THREE.OrbitControls(camera, renderer.domElement);

requestAnimationFrame(render);
addEventListener("resize", onWindowResize);

export const scene = new THREE.Scene();

scene.add(lights());

function lights(color?): THREE.Object3D {
    let lightsGroup = new THREE.Object3D('lights');
    lightsGroup.add(new THREE.AmbientLight(color, 0.2));

    let light = new THREE.DirectionalLight(color, 0.2);
    light.position.set(-5, -15, -20);
    lightsGroup.add(light);

    light = new THREE.DirectionalLight(color, 0.8);
    light.position.set(5, 15, 20);
    lightsGroup.add(light);

    light.castShadow = true;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.left = -s;
    light.shadow.camera.right = s;
    light.shadow.camera.top = s;
    light.shadow.camera.bottom = -s
    light.shadow.bias = -0.000016
    // scene.add(new THREE.CameraHelper(light.shadow.camera));

    return lightsGroup;
}

function aspect() {
    return innerWidth / innerHeight;
}

function render(t) {
    renderer.render(scene, camera);
    activeAnimations = activeAnimations.filter(play => !play(t))
    requestAnimationFrame(render);
}

function onWindowResize() {
    camera.left = -s*aspect();
    camera.right = s*aspect();
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    checkHareIsNearSign()
}

export function cubeMesh (parent, material) {
    let mesh = new THREE.Mesh(cube, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return object(parent).add(mesh);
}

export function object(parent) {
    let obj = new THREE.Object3D();
    parent && parent.add(obj);
    let o = {
        obj,
        remove: () => parent.remove(obj),
        add: child => obj.add(child) && o,
        scale: (x, y, z): any => xyz(obj.scale, x, y, z) || o,
        pos: (x, y, z): any => xyz(obj.position, x, y, z) || o,
        rot: (x, y, z): any => xyz(obj.rotation, x, y, z) || o
    }
    return o;
}

export function xyz(obj, x, y, z): boolean {
    obj.x = x;
    obj.y = y;
    obj.z = z;
    return false
}

export function hsl(h, s, l, clip?) {
    let color = new THREE.Color(`hsl(${h||0}, ${s||50}%, ${l||50}%)`);
    return new THREE.MeshLambertMaterial({
        color,
        clippingPlanes: clip ? getClippingPlanes() : [],
        clipShadows: true
    });
}

export function lerp(a, b, t) {
    return a + (b-a)*t
}

export function angleLerp(a0,a1,t) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return a0 + (2*da % max - da)*t;
}

export function texture(svg) {
    let img = new Image();
    let mat = new THREE.MeshLambertMaterial();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    img.onload = () => {
        let cnv = document.createElement("canvas");
        cnv.width = img.width;
        cnv.height = img.height;
        let ctx = cnv.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let texture = new THREE.Texture(cnv);
        texture.anisotropy = 32;
        texture.needsUpdate = true;
        mat.needsUpdate = true;
        mat.map = texture;
    };
    return mat;
}

export function svg(w, h, html) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}px" height="${h}px">${html}</svg>`;
}

export function raycaster(cb) {
    let cast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    let handle = e => {
        if (e.target.nodeName.toLowerCase() === "path")
            return
        mouse.x = ( e.clientX / innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / innerHeight ) * 2 + 1;
        cast.setFromCamera( mouse, camera );
        let intersects = cast.intersectObjects(getGround().possibleToMove, true);
        intersects[0] && cb(intersects[0].point, intersects[0])
    };

    addEventListener('click', handle);
    addEventListener('touchstart', e => handle(e.touches[0]));

}

function clippingPlanes() {
    return [
        [0, 0, 1],
        [0, 0, -1],
        [1, 0, 0],
        [ -1, 0, 0]
    ].map(el => new THREE.Plane( new THREE.Vector3( ...el), 10.4 ))
}

