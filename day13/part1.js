const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let timestamp = parseInt(lines[0]);
    let ids = lines[1].split(',')
        .filter(id => id !== 'x')
        .map(id => parseInt(id))

    let busToTakeId = ids[0];
    let timeToWait = Number.MAX_SAFE_INTEGER;

    for (let id of ids) {
        let ttw = id - (timestamp % id);
        if (ttw < timeToWait) {
            timeToWait = ttw;
            busToTakeId = id;
        }
    }

    return timeToWait * busToTakeId;
}

let input =
`
939
7,13,x,x,59,x,31,19
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
        assert.strictEqual(result, 295, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

