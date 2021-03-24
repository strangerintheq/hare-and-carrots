import * as THREE from 'three'
import {Sector} from "./data/Sector";
import {Renderer} from "./render/Renderer";
import {Lights} from "./render/Lights";
import {Ground} from "./render/Ground";
import {Camera} from "./render/Camera";
import {Hare} from "./render/Hare";

export class Game {

    renderer = new Renderer();
    camera = new Camera();
    scene = new THREE.Scene();
    ground: Ground;

    constructor() {
        this.scene.add(new Lights());
        this.scene.add(new Hare())
    }

    setMapSector(sector: Sector) {
        this.ground = new Ground(sector);
        this.scene.add(this.ground);
        console.log(this.scene)
    }

    render() {
        this.camera.onResize();
        this.renderer.render(this.scene, this.camera);
    }
}
