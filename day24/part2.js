const assert = require('assert').strict;
const fs = require('fs');

const adjacent = [
    [1, 0], [1, - 1], [0, -1], [-1, 0], [-1, 1], [0, 1]
];

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let grid = new Set();

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
        if (!grid.has(cords)) {
            grid.add(cords);
        } else {
            grid.delete(cords);
        }

    }

    for (let i = 0; i < 100; i++) {
        const counter = new Map();
        const newGrid = new Set();

        for (const cords of grid) {
            for (const [dx, dy] of adjacent) {
                const c = JSON.parse(cords);
                const key = JSON.stringify([c[0] + dx, c[1] + dy]);
                if (!counter.has(key)) {
                    counter.set(key, 1);
                } else {
                    counter.set(key, counter.get(key) + 1);
                }
            }
        }

        for (const cords of grid) {
            if (counter.has(cords) && counter.get(cords) <= 2) {
               newGrid.add(cords);
            }
        }

        for (const [cords, count] of counter) {
           if (count === 2 && !grid.has(cords)) {
                newGrid.add(cords);
           }
        }

        grid = newGrid;
    }

    return grid.size;
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
        assert.strictEqual(result, 2208, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

