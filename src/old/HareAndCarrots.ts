import {addAnimation, raycaster} from "./core/Framework";
import {reCreateGround} from "./world/ground/Ground";
import {createHare, moveHareAnimation, tryJump} from "./world/objects/Hare";
import {createClouds} from "./world/objects/Clouds";
import {addItem} from "./core/Gui";
import {renderMiniMap} from "./core/MiniMap";

addAnimation(moveHareAnimation);
reCreateGround();
createClouds();
createHare();
raycaster((pt, obj) => {
    tryJump(obj.object.parent.position)
});
addItem(1)