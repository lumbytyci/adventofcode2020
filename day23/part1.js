const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let ring = input.trim().split('').map(x => parseInt(x));
    let c = 0;
    let minCup = Math.min(...ring);
    let maxCup = Math.max(...ring);

    for (let i = 0; i < 100; i++) {
        while (c !== 0) {
            ring.push(ring.shift());
            c--;
        }

        const picked = ring.splice(c + 1, 3);

        let destination = ring[c] - 1;

        if (destination < minCup) {
            destination = maxCup;
        }

        while (picked.includes(destination)) {
            destination = destination - 1;
            if (destination < minCup) {
                destination = maxCup;
            }
        }

        ring.splice(ring.indexOf(destination) + 1, 0, ...picked);
        c++;
    }

    while(ring[0] !== 1) {
        ring.push(ring.shift());
    }

    return ring.join('').substring(1);
}

let input =
`
389125467
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
        assert.strictEqual(result, '67384529', "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

