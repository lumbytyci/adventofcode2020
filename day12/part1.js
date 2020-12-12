const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let x = 0, y = 0;
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let currDirIdx = 1;

    for (let ins of lines) {
        let moveDir = ins.charAt(0);
        let units = parseInt(ins.substring(1));

        if (moveDir === 'N') {
            y += units;
        } else if (moveDir === 'E') {
            x += units;
        } else if (moveDir === 'S') {
            y -= units;
        } else if (moveDir === 'W') {
            x -= units;
        } else if (moveDir === 'F') {
            x += units * directions[currDirIdx][0];
            y += units * directions[currDirIdx][1];
        } else if (moveDir === 'R') {
            let r = units / 90;
            currDirIdx = (currDirIdx + r) % 4;
        } else if (moveDir === 'L') {
            let r = units / 90;
            currDirIdx = (4 + currDirIdx - r) % 4;
        } else {
            throw 'Incorrect movement direction!';
        }
    }

    return Math.abs(x) + Math.abs(y);
}

let input =
`F10
N3
F7
R90
F11`

const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log("<<<Running with user input>>>");
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 25, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

