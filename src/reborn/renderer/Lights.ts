import {AmbientLight, DirectionalLight, Object3D} from "three";

export class Lights extends Object3D {

    constructor() {
        super();

        const color = 'white';

        this.add(new AmbientLight(color, 0.2));

        const light1 = new DirectionalLight(color, 0.2);
        light1.position.set(-5, -15, -20);
        this.add(light1);

        const light2 = new DirectionalLight(color, 0.8);
        light2.position.set(5, 15, 20);
        this.add(light2);

        this.shadow(light2);
    }

    private shadow(light: DirectionalLight) {
        const s = 13;
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