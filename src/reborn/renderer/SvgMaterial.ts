
import { MeshLambertMaterial, Texture} from "three";

export class SvgMaterial extends MeshLambertMaterial {
    constructor(svg) {
        super();
        let img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(svg);
        img.onload = () => {
            let cnv = document.createElement("canvas");
            cnv.width = img.width;
            cnv.height = img.height;
            let ctx = cnv.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let texture = new Texture(cnv);
            texture.anisotropy = 8;
            texture.needsUpdate = true;
            this.needsUpdate = true;
            this.map = texture;
        };
    }
}


export function svg(w, h, html) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}px" height="${h}px">${html}</svg>`;
}