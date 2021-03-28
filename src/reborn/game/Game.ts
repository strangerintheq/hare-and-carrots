import {Object3D, Scene} from "three";
import {Sector} from "../data/Sector";
import {Renderer} from "../renderer/Renderer";
import {Lights} from "../renderer/Lights";
import {Ground} from "./Ground";
import {Camera} from "../renderer/Camera";
import {HareController} from "./HareController";
import {RayCaster} from "../renderer/RayCaster";
import {JumpHareAnimation} from "../animations/JumpHareAnimation";
import {Anim} from "../animations/Anim";
import {Cell} from "../data/Cell";

export class Game {

    renderer = new Renderer();
    camera = new Camera();
    scene = new Scene();
    rayCaster: RayCaster;
    ground: Ground;
    hare: HareController;
    animations: Anim[] = [];

    constructor() {
        this.scene.add(new Lights());
        this.hare = new HareController();
        this.scene.add(this.hare);
        this.rayCaster = new RayCaster((o) => this.click(o), this.camera);
        this.resize();
    }

    setMapSector(sector: Sector) {
        this.ground && this.ground.parent.remove(this.ground)
        this.ground = new Ground(sector);
        this.scene.add(this.ground);
        this.rayCaster.update(this.ground.getPossibleToMoveCells());
        this.hare.mirrorPosition(sector.halfSize);
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
        this.activateCell(nextCell);
        this.animations.push(new JumpHareAnimation(this.hare, nextCell, rotation));
    }

    private activateCell(cell: Cell) {
        this.playCellAnimation(cell);
        if (this.ground.sector.isOnEdge(cell)) {
            setTimeout(() =>{
                dispatchEvent(new CustomEvent('change-sector', {detail: cell}))
            }, 350)
        }
    }

    private playCellAnimation(cell: Cell) {
        const cellAnimation = cell.getAnimation();
        if (!cellAnimation)
            return
        cellAnimation.position.set(cell.x, 0, cell.y);
        cellAnimation.rotation.set(0, this.hare.rotation.y, 0)
        this.animations.push(cellAnimation);
        this.ground.add(cellAnimation);
    }

    resize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.onResize();
    }

    placeHare() {

    }
}
