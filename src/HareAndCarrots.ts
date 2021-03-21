import {addAnimation, raycaster} from "./Framework";
import {inventory} from "./Inventory";
import { createGround, } from "./ground/Ground";
import {groundData} from "./ground/Map";
import {createHare, handeRaycast, moveHareAnimation} from "./objects/Hare";
import {createClouds} from "./objects/Clouds";

addAnimation(moveHareAnimation);
createGround(groundData());
createClouds();
createHare();
raycaster(handeRaycast);
inventory();
