import {Object3D} from "three";
import * as THREE from "three";

export class Lights extends Object3D {

    constructor() {
        super();
        let s = 11;
        let color = 'white';

        this.add(new THREE.AmbientLight(color, 0.2));

        let light = new THREE.DirectionalLight(color, 0.2);
        light.position.set(-5, -15, -20);
        this.add(light);

        light = new THREE.DirectionalLight(color, 0.8);
        light.position.set(5, 15, 20);
        this.add(light);

        light.castShadow = true;
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        light.shadow.camera.left = -s;
        light.shadow.camera.right = s;
        light.shadow.camera.top = s;
        light.shadow.camera.bottom = -s
        light.shadow.bias = -0.000016


    }
}