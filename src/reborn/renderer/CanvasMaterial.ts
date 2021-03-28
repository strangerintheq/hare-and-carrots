import {MeshLambertMaterial, Texture} from "three";

export class CanvasMaterial extends MeshLambertMaterial{

    constructor(width: number, height: number,
                func: (ctx:CanvasRenderingContext2D) => void) {
        super()
        const cnv = document.createElement("canvas");
        cnv.width = width;
        cnv.height = height;
        const ctx = cnv.getContext("2d");
        ctx.textAlign = "center"
        ctx.textBaseline = "middle";
        ctx.font = '50px Arial'
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,width, height)
        func(ctx);
        const texture = new Texture(cnv);
        texture.anisotropy = 8;
        texture.needsUpdate = true;
        this.needsUpdate = true;
        this.map = texture;
    }
}