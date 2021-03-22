import {addAnimation, raycaster} from "./Framework";
import {reCreateGround} from "./ground/Ground";
import {createHare, moveHareAnimation, tryJump} from "./objects/Hare";
import {createClouds} from "./objects/Clouds";

addAnimation(moveHareAnimation);
reCreateGround();
createClouds();
createHare();
raycaster((pt, obj) => {
    tryJump(obj.object.parent.position)
});
