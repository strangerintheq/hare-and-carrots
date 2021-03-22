import {addAnimation, raycaster} from "./core/Framework";
import {reCreateGround} from "./world/ground/Ground";
import {createHare, moveHareAnimation, tryJump} from "./world/objects/Hare";
import {createClouds} from "./world/objects/Clouds";

addAnimation(moveHareAnimation);
reCreateGround();
createClouds();
createHare();
raycaster((pt, obj) => {
    tryJump(obj.object.parent.position)
});
