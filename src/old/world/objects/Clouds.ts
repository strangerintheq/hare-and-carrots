import {addAnimation, cubeMesh, object, scene} from "../../core/Framework";
import {white} from "../../core/Materials";

export function createClouds() {
    let allClouds = object(scene);

    for(let i = 0; i < 3; i++){
        let cloud = object(allClouds);
        addAnimation(t => {
            cloud.pos(i*6-2, 10-i, (((i*1e4+t)/(60000+i*1000))%1)*21-10)
            return false
        });
        cubeMesh(cloud, white).scale(1, 0.5, 3)
        cubeMesh(cloud, white).scale(1, 0.5, 2).pos(0,0.5,1)
    }
}