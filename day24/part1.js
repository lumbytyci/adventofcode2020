const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let grid = new Map();

    for (let line of lines) {
        let x = 0;
        let y = 0;

        for (let i = 0; i < line.length;) {
            if (line.startsWith('e', i)) {
                x = x + 1;
                i -= 1;
            } else if (line.startsWith('se', i)) {
                x = x + 1;
                y = y - 1;
            } else if (line.startsWith('sw', i)) {
                y = y - 1;
            } else if (line.startsWith('w', i)) {
                x = x - 1;
                i -= 1;
            } else if (line.startsWith('nw', i)) {
                x = x - 1;
                y = y + 1;
            } else if (line.startsWith('ne', i)) {
                y = y + 1;
            }

            i += 2;
        }

        let cords = JSON.stringify([x,y]);
        if (grid.has(cords)) {
            grid.set(cords, !grid.get(cords));
        } else {
            grid.set(cords, true);
        }

    }

    return [...grid.values()].filter(tile => tile).length;
}

let input =
`
sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew
`
const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log("<<<Running with user input>>>");
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 10, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

