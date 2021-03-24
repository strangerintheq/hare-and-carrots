import {OrthographicCamera} from "three";

export class Camera extends OrthographicCamera {

    constructor() {
        super(1, 1, 1, 1, 0.1, 100);
        this.position.set(15, 16, 15);
        this.lookAt(0,1,0)
    }

    onResize() {
        let a = innerWidth / innerHeight;
        let s = 11;
        this.left = -s*(a>1?a:1);
        this.right = s*(a>1?a:1);
        this.top = s/(a<1?a:1);
        this.bottom = -s/(a<1?a:1);
        this.updateProjectionMatrix();
    }
}