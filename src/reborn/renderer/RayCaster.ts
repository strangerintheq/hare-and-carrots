import {Camera, Object3D, Raycaster, Vector2} from "three";
import {CellBase} from "../objects/CellBase";


export class RayCaster extends Raycaster {

    mouse = new Vector2();
    possibleToMoveCells: Object3D[] = [];

    constructor(cb, camera: Camera) {
        super();

        let handle = e => {
            if (e.target.nodeName.toLowerCase() === "path")
                return
            this.mouse.x = ( e.clientX / innerWidth ) * 2 - 1;
            this.mouse.y = - ( e.clientY / innerHeight ) * 2 + 1;
            this.setFromCamera(this.mouse, camera );
            let intersects = this.intersectObjects(this.possibleToMoveCells, true);
            intersects[0] && cb(intersects[0].object)
        };

        addEventListener('click', handle);
        addEventListener('touchstart', e => handle(e.touches[0]));
    }

    update(possibleToMoveCells: CellBase[]) {
        this.possibleToMoveCells = possibleToMoveCells
    }

    addObject(dialogCloud: Object3D) {
        let start = this.possibleToMoveCells.indexOf(dialogCloud);
        if (start === -1)
            this.possibleToMoveCells = [dialogCloud, ...this.possibleToMoveCells]
    }

    removeObject(dialogCloud: Object3D) {
        let start = this.possibleToMoveCells.indexOf(dialogCloud);
        if (start > -1)
            this.possibleToMoveCells.splice(start,1)
    }
}