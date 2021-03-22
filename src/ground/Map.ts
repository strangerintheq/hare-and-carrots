import SimplexNoise from 'simplex-noise'

const seed = '0'

const noises = [...Array(10)]
    .map((e,i) => new SimplexNoise(seed + i));

function noisedCellHeight(x, y) {
    return noises[0].noise2D(x/15, y/15);
}

function noiseMapData(mapCursor) {
    let data = [];
    let mapSize = 19;
    for (let y = -10; y <= 10; y++) {
        let row = []
        for (let x = -10; x <= 10; x++) {
            let cx = y+mapCursor[0]*mapSize;
            let cy = x+mapCursor[1]*mapSize;
            let cellHeight = noisedCellHeight(cx, cy);
            let cellType = 'W';
            if (cellHeight > 0) {
                cellType = 'G'
                if (noises[1].noise2D(cx, cy) > 0.9)
                    cellType = 'C'
                if (cellHeight > 0.2 && noises[2].noise2D(cx, cy) > 0.8)
                    cellType = 'B'
                if (cellHeight > 0.2 && noises[3].noise2D(cx, cy) > 0.9)
                    cellType = noises[4].noise2D(cx, cy) > 0 ? 'T' : 't'
            }

            let heightValue = (cellHeight*10) | 0;
            row.push(`${cellType}${heightValue}`);
        }
        data.push(row);
    }
    return data
}

const maps = [
    [ocean, plane, ocean],
    [ocean, startingLocation, startingLocation1],
    [ocean, ocean, ocean],
]


export function getMapData(mapCursor){
    return noiseMapData(mapCursor)
    // return maps[mapCursor[1]+1][mapCursor[0]+1]()
}

function startingLocation() {
    return `
        G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 G2 G2 G3 G4
        G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 t2 C3 G3
        G0 G0 C0 G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 G0 G1 G1 G2 G2 G2
        G0 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 G1 G2
        G0 G1 T2 G1 G0 G0 G0 G0 c0 G0 G0 G0 G0 G0 B0 B1 G0 G0 G0 G1 G1
        G0 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G1 G1 T1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 T0 G0 G0 S0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G0 G0 G0 G0 G0 C0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G0 G0 G0 G0 G2 G3 G2 G1 G0 G0 G0 s0 G0 G0 G0 G0 G0 G0
        G1 G1 G1 G1 G0 G0 G0 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G2 G2 G2 G1 G1 G0 G0 G0 G0 G0 C0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G2 G2 G2 G2 S1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G1 G2 S2 G2 G1 G0 G0 G0 C0 G0 G0 g0 G0 G0 G0 G0 G0 G0 G0 G0 W0
        G1 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0
        G0 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 K0 G0 G0 W0 W2
        G0 G0 G0 G0 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0
        W0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 C1 G0 G0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 G0 G0 G0 G0 G0 G0 G0 G1 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 C0 G0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
    `;
}


function startingLocation1() {
    return `
        G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0 W0
        G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G0 G0 C0 G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G0 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G0 G1 T2 G1 G0 G0 G0 G0 c0 G0 G0 G0 G0 G0 B0 W0 W0 W0 W0 W0 W0
        G0 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G0 G0 G0 G1 G1 T1 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G0 T0 G0 G0 S0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0 W0
        G0 G0 G0 G0 G0 G0 G0 G0 C0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0 W0
        G0 G0 G0 G0 G0 G0 G0 G2 G3 G2 G1 G0 G0 W0 W0 W0 W0 W0 W0 W0 W0
        G1 G1 G1 G1 G0 G0 G0 G1 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0 W0
        G2 G2 G2 G1 G1 G0 G0 G0 G0 G0 C0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G2 G2 G2 G2 S1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0 W0 W0 W0
        G1 G2 S2 G2 G1 G0 G0 G0 C0 G0 G0 g0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        G1 G1 G1 G1 G1 G1 G0 G0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        G0 G1 G1 G1 G1 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        G0 G0 G0 G0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 G0 G0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
    `;
}

function groundData1() {
    return `
        G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 G2 G2 G3 G4
        G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 t2 C3 G3
        G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 T0 G0 G0 G0 G0 G0 G1 G1 G2 G2 G2
        G0 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G1 G1 G1 G2
        G0 G1 T2 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 B0 B1 G0 G0 G0 G1 G1
        G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G2 G2 G2 G1 G1 G0 G0 G0 G0 G0 C0 y0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G2 G2 G2 G2 S1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G1 G2 S2 G2 G1 G0 G0 G0 C0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0
        G1 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0
        G0 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W2
        G0 G0 G0 G0 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 W0 W0 W0
        W0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 C1 G0 G0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 G0 G0 G0 G0 G0 G0 G0 G1 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 C0 G0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0 W0
        G0 G1 G1 G1 G1 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G1 G1 T1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 T0 G0 G0 S0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0
        G0 G0 G0 G0 G0 G0 G0 G0 G0 C0 G1 G0 G0 G0 G0 G0 G0 G0 G0 G0 G0

    `;
}

function ocean(){
    return [...Array(21)]
        .map(() => {
            return [...Array(21)]
                .map(() => 'W0')
                .join(' ')
            })
        .join('\n')
}

function plane(){
    return [...Array(21)]
        .map(() => {
            return [...Array(21)]
                .map(() => 'G0')
                .join(' ')
        })
        .join('\n')
}
