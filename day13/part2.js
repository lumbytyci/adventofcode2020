const assert = require('assert').strict;
const fs = require('fs');
const crt = require('nodejs-chinese-remainder');
const bignum = require('bignum');

/*
    Execution time: 2.2009ms
    Chinese remainder theorem: https://en.wikipedia.org/wiki/Chinese_remainder_theorem
    NPM Package: https://www.npmjs.com/package/nodejs-chinese-remainder
    Tip: Package will export bignum method by default but you can modify the index.js to
    export both functions should you need them.
*/

const runPart = (input) => {
    let ids = input.trim().split('\n')[1].split(',');
    let parsedIds = [];

    for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== 'x') {
            parsedIds.push([ids[i], i]);
        }
    }

    let buses = parsedIds.map(x => bignum(x[0]));
    let mods = parsedIds.map(x => bignum(x[0] - x[1]));

    return crt.crt_bignum(mods, buses).toString();
}

let input =
`
---
1789,37,47,1889
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
        assert.strictEqual(result, '1202161486', "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

