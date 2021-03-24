import {Object3D, Scene} from "three";
import {Sector} from "./data/Sector";
import {Renderer} from "./base/Renderer";
import {Lights} from "./base/Lights";
import {Ground} from "./objects/Ground";
import {Camera} from "./base/Camera";
import {Hare} from "./objects/Hare";
import {RayCaster} from "./base/RayCaster";
import {JumpHareAnimation} from "./animations/JumpHareAnimation";
import {Anim} from "./animations/Anim";

export class Game {

    renderer = new Renderer();
    camera = new Camera();
    scene = new Scene();
    rayCaster: RayCaster;
    ground: Ground;
    hare: Hare;
    animations: Anim[] = [];

    constructor() {
        this.scene.add(new Lights());
        this.hare = new Hare();
        this.scene.add(this.hare);
        this.rayCaster = new RayCaster((o) => this.click(o), this.camera)
        this.resize();
    }

    setMapSector(sector: Sector) {
        this.ground = new Ground(sector);
        this.scene.add(this.ground);
        this.rayCaster.update(this.ground.getPossibleToMoveCells());
    }

    render() {
        this.animations = this.animations.filter(a => a.playAnimation())
        this.renderer.render(this.scene, this.camera);
    }

    private click(obj: Object3D) {
        const p0 = this.hare.position;
        const p1 = obj.parent.parent.position;
        const dx = Math.sign(p0.x - p1.x);
        const dz = Math.sign(p0.z - p1.z);
        const x = p0.x - dx;
        const z = p0.z - dz;
        const nextCell = this.ground.getCell(x, z);
        const rotation = dx * dx + dz * dz !== 0 ? Math.atan2(-dx, -dz) : this.hare.rotation.y;
        this.animations.push(new JumpHareAnimation(this.hare, nextCell, rotation, () => {
            const cellAnimation = nextCell.getAnimation();
            if (!cellAnimation)
                return
            cellAnimation.position.set(x, 1, z);
            this.animations.push(cellAnimation);
            this.ground.add(cellAnimation)
        }));
    }

    resize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.onResize();
    }
}