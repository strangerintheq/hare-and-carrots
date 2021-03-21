import {addAnimation, raycaster} from "./Framework";
import {createGround} from "./ground/Ground";
import {groundData} from "./ground/Map";
import {createHare, moveHareAnimation, tryJump} from "./objects/Hare";
import {createClouds} from "./objects/Clouds";

addAnimation(moveHareAnimation);
createGround(groundData());
createClouds();
createHare();
raycaster((pt, obj) => {
    tryJump(obj.object.parent.position)
});
