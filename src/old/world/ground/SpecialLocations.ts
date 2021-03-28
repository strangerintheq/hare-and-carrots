import {split} from "./Ground";

export const SpecialLocations = {
    "[0,0]": `
          - - X X X X X - -
          - X X X X X X X -
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X c X X X X
          - X X X X X X X -
          - - X X X X X - -  
        `,

    "[0,1]": `
          - - X X X X X - -
          - X X X X X X X -
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X s X X X X
          - X X X X X X X -
          - - X X X X X - -  
        `,

    "[0,-1]": `
          - - X X X X X - -
          - X X X X X X X -
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X X X X X X
          X X X X g X X X X
          - X X X X X X X -
          - - X X X X X - -  
        `,


}

Object.keys(SpecialLocations).forEach(k => {
    const data = split(SpecialLocations[k]);
    SpecialLocations[k] = (x, y) => {
        try {
            return data[x+4][y+4]
        } catch (e){

        }
    };
})