const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let seen = new Map();
    let prevSeen = new Map();
    let nums = input.trim().split(',').map(n => parseInt(n));
    let spoken;

    for (let t = 1; t <= 30000000; t++) {
        if (t <= nums.length) {
            spoken = nums[t - 1];
        } else if (!prevSeen.has(spoken)) {
            spoken = 0;
        } else {
            spoken = seen.get(spoken) - prevSeen.get(spoken);
        }

        if (seen.has(spoken)) {
            prevSeen.set(spoken, seen.get(spoken));
        }

        seen.set(spoken, t);
    }

    return spoken;
}

let input =
`
0,3,6
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
        assert.strictEqual(result, 175594, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

