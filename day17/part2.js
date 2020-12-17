const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let cube = new Map();

    for (const [y, line] of lines.entries()) {
        for (const [x, symbol] of line.split('').entries()) {
            if (symbol === '#') {
                cube.set(JSON.stringify([x, y, 0, 0]), '#');
            }
        }
    }

    for (let cycle = 0; cycle < 6; cycle++) {
        let visited = new Map();
        for (const [cords, symbol] of cube) {
            let c = JSON.parse(cords);
            for (let dw of [-1, 0, 1]) {
                for (let dz of [-1, 0, 1]) {
                    for (let dy of [-1, 0, 1]) {
                        for (let dx of [-1, 0, 1]) {
                            if (!(dx === 0 && dx === dy && dy === dz && dz === dw)) {
                                let k = JSON.stringify([c[0] + dx, c[1] + dy,
                                                        c[2] + dz, c[3] + dw]);
                                if (!visited.has(k)) {
                                    visited.set(k, 1);
                                } else {
                                    visited.set(k, visited.get(k) + 1);
                                }
                            }
                        }
                    }
                }
            }
        }

        let newCube = new Map();
        for (const [cords, val] of visited) {
            if (val === 3) {
                newCube.set(cords, '#');
            }
        }

        for (const cords of [...cube.keys()]) {
            if (2 <= visited.get(cords) && visited.get(cords) <= 3) {
                newCube.set(cords, '#');
            }
        }
        cube = newCube;
    }

    return cube.size;
}

let input =
`
.#.
..#
###
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
        assert.strictEqual(result, 848, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

