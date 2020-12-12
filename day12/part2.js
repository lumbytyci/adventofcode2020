const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let x = 0, y = 0;
    let wx = 10, wy = 1; // 10 east, 1 north {waypoint}

    for (let ins of lines) {
        let moveDir = ins.charAt(0);
        let units = parseInt(ins.substring(1));

        if (moveDir === 'N') {
            wy += units;
        } else if (moveDir === 'E') {
            wx += units;
        } else if (moveDir === 'S') {
            wy -= units;
        } else if (moveDir === 'W') {
            wx -= units;
        } else if (moveDir === 'F') {
            x += wx * units;
            y += wy * units;
        } else if (moveDir === 'R') {
            for (let i = 0; i < units / 90; i++) {
                [wx, wy] = [wy, wx];
                wy *= -1;
            }
        } else if (moveDir === 'L') {
            for (let i = 0; i < units / 90; i++) {
                [wx, wy] = [wy, wx];
                wx *= -1;
            }
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
        assert.strictEqual(result, 286, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

