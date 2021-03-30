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
import {saveSector} from "../storage/SectorStorage";

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
    private sector: Sector;

    constructor() {
        this.scene.add(new Lights());
        this.scene.add(this.hare);
        this.rayCaster = new RayCaster((o) => this.click(o), this.camera);
        this.resize();
    }

    setMapSector(sector: Sector) {
        this.sector = sector;
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
        info(`
            animations: ${this.animations.length} <br>
            raycaster: ${this.rayCaster.possibleToMoveCells.length} 
        `)
    }

    resize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.onResize();
    }

    placeHare() {

    }

    private click(obj: Object3D) {
        if (obj.parent.parent.parent === this.dialogCloud)
            return this.doCloudDialogAction()
        if (this.hareState.isJumping)
            return
        this.hareState.isJumping = true
        let cell = this.handleJump(obj);
        this.jumpedToCellCell(cell);
    }

    private handleJump(obj: Object3D): Cell{
        const p0 = this.hare.position;
        const p1 = obj.parent.parent.position;
        const dx = Math.sign(p0.x - p1.x);
        const dz = Math.sign(p0.z - p1.z);
        const x = p0.x - dx;
        const z = p0.z - dz;
        const nextCell = this.ground.getCell(x, z);
        this.hareState.rotation = dx * dx + dz * dz !== 0 ? Math.atan2(-dx, -dz) : this.hare.rotation.y;
        this.animations.push(new JumpHareAnimation(this.hare, nextCell, this.hareState.rotation));
        return nextCell;
    }

    private jumpedToCellCell(cell: Cell) {
        playCellAudio(cell);
        this.rayCaster.removeObject(this.dialogCloud);
        this.dialogCloud.hide();
        this.startAnimation(cell.getAnimation(), cell);
        setTimeout(() => this.endJump(cell), 175);
    }

    private showDialogCloud(cell: Cell) {
        this.scene.add(this.dialogCloud);
        this.animations.push(this.dialogCloud);
        this.dialogCloud.setImage(cell.object)
        this.dialogCloud.showAt(cell);
        this.rayCaster.addObject(this.dialogCloud)
    }

    private startAnimation(animation: Anim, cell: Cell) {
        if (!animation)
            return
        let h = cell.isWater() ? 0 : cell.height
        animation.pos(cell.x, h, cell.y);
        animation.rot(0, this.hare.rotation.y, 0)
        this.animations.push(animation);
        this.ground.add(animation);
    }

    private doCloudDialogAction() {
        this.dialogCloud.hide();
        this.rayCaster.removeObject(this.dialogCloud);
        const cell = this.ground.getCell(this.hare.position.x, this.hare.position.z)
        if (cell.object === CellObjectType.CARROT) {
            cell.object = CellObjectType.NONE;
            this.changeCell(cell);
            this.hareState.carrotsEaten ++;

            if (this.hareState.carrotsEaten % 1 === 0) {
                const dy = Math.round(Math.cos(this.hare.rotation.y));
                const dx = Math.round(Math.sin(this.hare.rotation.y));
                const x = this.hare.position.x - dx;
                const y = this.hare.position.z - dy;
                const cellBehind = this.ground.getCell(x, y)
                cellBehind.object = CellObjectType.POO;
                this.changeCell(cellBehind);
            }

        }


    }

    private changeCell(c: Cell) {
        c.updateCell();
        saveSector(this.sector);
    }

    private endJump(cell:Cell) {
        if (cell.object === CellObjectType.CARROT)
            this.showDialogCloud(cell);
        this.startAnimation(cell.handleCellLogic(this.hareState), cell);
        if (this.ground.sector.isOnEdge(cell))
            dispatchEvent(new CustomEvent('change-sector', {detail: cell}))
        this.hareState.isJumping = false
    }
}
