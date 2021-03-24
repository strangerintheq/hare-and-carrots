import {Object3D, Scene} from "three";
import {Sector} from "./data/Sector";
import {Renderer} from "./render/Renderer";
import {Lights} from "./render/Lights";
import {Ground} from "./render/Ground";
import {Camera} from "./render/Camera";
import {Hare} from "./render/Hare";
import {RayCaster} from "./RayCaster";

export class Game {

    renderer = new Renderer();
    camera = new Camera();
    scene = new Scene();
    rayCaster:RayCaster;
    ground: Ground;

    constructor() {
        this.scene.add(new Lights());
        this.scene.add(new Hare())
        this.rayCaster = new RayCaster((o) => this.click(o), this.camera)
    }

    setMapSector(sector: Sector) {
        this.ground = new Ground(sector);
        this.scene.add(this.ground);
        this.rayCaster.update(this.ground.getPossibleToMoveCells());
    }

    render() {
        this.camera.onResize();
        this.renderer.render(this.scene, this.camera);
    }

    private click(o: Object3D) {
        console.log(o)
    }
}
