import SimplexNoise from 'simplex-noise'

const seed = '0';
const noises = {};


function noise(cellType, x, y) {
    if (!noises[cellType])
        noises[cellType] = new SimplexNoise(seed + cellType)
    return noises[cellType].noise2D(x,y)
}

function noiseMapData(mapCursor) {
    let data = [];
    let mapSize = 19;
    for (let y = -10; y <= 10; y++) {
        let row = []
        for (let x = -10; x <= 10; x++) {
            let cx = y+mapCursor[0]*mapSize;
            let cy = x+mapCursor[1]*mapSize;
            row.push(singleCell(cx,cy));
        }
        data.push(row);
    }
    return data
}

function singleCell(cx, cy) {
    let groundNoiseScale = 15
    let cellHeight = noise('G', cx/groundNoiseScale, cy/groundNoiseScale);
    let cellType = 'W';
    if (cellHeight > 0) {
        cellType = 'G'
        if (noise('C', cx, cy) > 0.9)
            cellType = 'C'
        else if (noise('S', cx, cy) > 0.9)
            cellType = 'S'
        else if (noise( 'B', cx, cy) > 0.8)
            cellType = 'B'
        else if (noise( 'T', cx, cy) > 0.8)
            cellType = noise( 't', cx, cy) > 0 ? 'T' : 't'
        // else if (noises[4].noise2D(cx, cy) > 0.9)
        //     cellType =  't'
    }

    let heightValue = (cellHeight*10) | 0;

    return `${cellType}${heightValue}`;
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
