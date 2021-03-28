import {Object3D, Scene} from "three";
import {Sector} from "../data/Sector";
import {Renderer} from "../renderer/Renderer";
import {Lights} from "../renderer/Lights";
import {Ground} from "./Ground";
import {Camera} from "../renderer/Camera";
import {HareController} from "./HareController";
import {RayCaster} from "../renderer/RayCaster";
import {JumpHareAnimation} from "../animations/JumpHareAnimation";
import {Anim} from "../renderer/Anim";
import {Cell} from "../data/Cell";
import {CellObjectType} from "../data/CellObjectType";
import {DialogCloud} from "../animations/DialogCloud";
import {info} from "../gui/Info";

export class Game {

    renderer = new Renderer();
    camera = new Camera();
    scene = new Scene();
    rayCaster: RayCaster;
    ground: Ground;
    hare = new HareController();
    animations: Anim[] = [];
    dialogCloud = new DialogCloud();

    constructor() {
        this.scene.add(new Lights());
        this.scene.add(this.hare);
        this.rayCaster = new RayCaster((o) => this.click(o), this.camera);
        this.resize();
    }

    setMapSector(sector: Sector) {
        this.ground && this.ground.parent.remove(this.ground)
        this.ground = new Ground(sector);
        this.scene.add(this.ground);
        this.rayCaster.update([...this.ground.getPossibleToMoveCells(), this.dialogCloud]);
        this.hare.mirrorPosition(sector.halfSize);
    }

    render() {
        const now = Date.now();
        this.animations = this.animations.filter(a => a.playAnimation(now))
        this.renderer.render(this.scene, this.camera);
        info('animations: ' + this.animations.length)
    }

    private click(obj: Object3D) {

        if (obj.parent.parent.parent === this.dialogCloud){
            this.dialogCloud.hide();
            const cell = this.ground.getCell(this.hare.position.x, this.hare.position.z)
            cell.object = CellObjectType.NONE;
            cell.updateCell();
            return
        }

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
        this.dialogCloud.hide();
        this.playCellAnimation(cell);
        setTimeout(() => {
            if (cell.object === CellObjectType.CARROT)
                this.showDialogCloud(cell);
            if (this.ground.sector.isOnEdge(cell))
                dispatchEvent(new CustomEvent('change-sector', {detail: cell}))
        }, 350);
    }

    private showDialogCloud(cell: Cell) {
        this.scene.add(this.dialogCloud);
        this.animations.push(this.dialogCloud);
        this.dialogCloud.setImage(cell.object)
        this.dialogCloud.showAt(cell);
    }

    private playCellAnimation(cell: Cell) {
        const cellAnimation = cell.getAnimation();
        if (!cellAnimation)
            return
        cellAnimation.pos(cell.x, 0, cell.y);
        cellAnimation.rot(0, this.hare.rotation.y, 0)
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
