import {Object3D, Scene} from "three";
import {Sector} from "../data/Sector";
import {Renderer} from "../renderer/Renderer";
import {Lights} from "../renderer/Lights";
import {Ground} from "../renderer/Ground";
import {Camera} from "../renderer/Camera";
import {HareController} from "./HareController";
import {RayCaster} from "../renderer/RayCaster";
import {JumpHareAnimation} from "../animations/JumpHareAnimation";
import {Anim} from "../renderer/Anim";
import {Cell} from "../data/Cell";
import {CellObjectType} from "../data/CellObjectType";
import {DialogCloud} from "../animations/DialogCloud";
import {info} from "../gui/Info";
import {playCellAudio} from "./Audio";
import {HareState} from "../data/HareState";
import {CellType} from "../data/CellType";
import {WaterStepsAnimation} from "../animations/WaterStepsAnimation";

export class Game {

    rayCaster: RayCaster;
    ground: Ground;
    animations: Anim[] = [];
    renderer = new Renderer();
    camera = new Camera();
    scene = new Scene();
    hare = new HareController();
    dialogCloud = new DialogCloud();
    hareState = new HareState();

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
        if (obj.parent.parent.parent === this.dialogCloud)
            return this.doCloudDialogAction()
        let cell = this.handleJump(obj);
        this.activateCell(cell);
    }

    private handleJump(obj: Object3D): Cell{
        const p0 = this.hare.position;
        const p1 = obj.parent.parent.position;
        const dx = Math.sign(p0.x - p1.x);
        const dz = Math.sign(p0.z - p1.z);
        const x = p0.x - dx;
        const z = p0.z - dz;
        const nextCell = this.ground.getCell(x, z);
        playCellAudio(nextCell);
        this.hareState.rotation = dx * dx + dz * dz !== 0 ? Math.atan2(-dx, -dz) : this.hare.rotation.y;
        this.animations.push(new JumpHareAnimation(this.hare, nextCell, this.hareState.rotation));
        return nextCell;
    }

    private activateCell(cell: Cell) {
        this.rayCaster.removeObject(this.dialogCloud);
        this.dialogCloud.hide();
        this.playCellAnimation(cell);
        setTimeout(() => this.endJump(cell), 150);
    }

    private showDialogCloud(cell: Cell) {
        this.scene.add(this.dialogCloud);
        this.animations.push(this.dialogCloud);
        this.dialogCloud.setImage(cell.object)
        this.dialogCloud.showAt(cell);
        this.rayCaster.addObject(this.dialogCloud)
    }

    private playCellAnimation(cell: Cell) {
        const cellAnimation = cell.getAnimation();
        if (!cellAnimation)
            return
        cellAnimation.pos(cell.x, cell.height, cell.y);
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

    private doCloudDialogAction() {
        this.dialogCloud.hide();
        this.rayCaster.removeObject(this.dialogCloud);
        const cell = this.ground.getCell(this.hare.position.x, this.hare.position.z)
        if (cell.object === CellObjectType.CARROT) {
            cell.object = CellObjectType.NONE;
            cell.updateCell();
            this.hareState.carrotsEaten ++;

            if (this.hareState.carrotsEaten % 3 === 0) {
                const dy = Math.round(Math.cos(this.hare.rotation.y));
                const dx = Math.round(Math.sin(this.hare.rotation.y));
                const x = this.hare.position.x - dx;
                const y = this.hare.position.z - dy;
                const cellBehind = this.ground.getCell(x, y)
                cellBehind.object = CellObjectType.POO;
                cellBehind.updateCell();
            }

        }


    }

    private endJump(cell:Cell) {
        if (this.ground.sector.isOnEdge(cell))
            dispatchEvent(new CustomEvent('change-sector', {detail: cell}))
        if (cell.object === CellObjectType.CARROT)
            this.showDialogCloud(cell);
        if (cell.object === CellObjectType.POO) {
            cell.object = CellObjectType.POO1;
            setTimeout(cell.updateCell, 100)
            this.hareState.pooStepsCount = 5;
        }
        if (this.hareState.pooStepsCount && cell.object === CellObjectType.NONE) {
            cell.object = CellObjectType.POO_STEPS
            cell.cellObjectRotation = this.hareState.rotation;
            cell.updateCell();
            this.hareState.pooStepsCount--;
        }
        if (cell.type === CellType.WATER || cell.type === CellType.OCEAN){
            this.hareState.inWater = true;
        }
        if (cell.type === CellType.GRASS){
            if (this.hareState.inWater)
                this.hareState.wetTimestamp = Date.now();
            this.hareState.inWater = false;
            if (Date.now() - this.hareState.wetTimestamp < 2000) {
                let waterSteps = new WaterStepsAnimation();
                waterSteps.rot(0, this.hareState.rotation, 0)
                waterSteps.pos(cell.x, cell.height, cell.y)
                this.ground.add(waterSteps);
                this.animations.push(waterSteps)
            }
        }
    }
}
