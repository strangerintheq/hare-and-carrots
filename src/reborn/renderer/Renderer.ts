import {Color, WebGLRenderer} from "three";

export class Renderer extends WebGLRenderer {

    constructor() {
        super({
            antialias: true
        })
        this.shadowMap.enabled = true;
        this.setClearColor(new Color("hsl(34, 50%, 70%)"));
        this.localClippingEnabled = true;
        document.body.appendChild(this.domElement);
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.userSelect = 'none';
    }
}