import {cubeMesh, object} from "../Framework";
import {white} from "../Materials";

export function createClouds(target, activeAnimations) {
    let allClouds = object(target);

    for(let i = 0; i < 3; i++){
        let cloud = object(allClouds);
        activeAnimations.push(t => {
            cloud.pos(i*6-2, 10-i, (((i*1e4+t)/(60000+i*1000))%1)*21-10)
            return false
        });
        cubeMesh(cloud, white).scale(1, 0.5, 3)
        cubeMesh(cloud, white).scale(1, 0.5, 2).pos(0,0.5,1)
    }
}