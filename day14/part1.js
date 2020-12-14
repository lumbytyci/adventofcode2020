const assert = require('assert').strict;
const fs = require('fs');
const bignum = require('bignum');

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let orMask = 0;
    let andMask = 0;
    let mem = {};

    const MATCH_MEM = new RegExp(/^mem\[(\d+)\] = (\d+)$/);

    for (let line of lines) {
        if (line.startsWith('mask')) {
            let rawMask = line.split(' ')[2];
            orMask = bignum(parseInt(rawMask.replace(/X/g, '0'), 2).toString());
            andMask = bignum(parseInt(rawMask.replace(/X/g, '1'), 2).toString());
        } else if (line.startsWith('mem')) {
            let match = line.match(MATCH_MEM);
            let memOffset = parseInt(match[1]);
            let memValue = bignum(match[2]);

            let maskedValue = memValue.or(orMask).and(andMask);

            mem[memOffset] = maskedValue;
        }
    }

    let sum = bignum('0');
    Object.values(mem).forEach(n => sum = sum.add(n));

    return sum.toString();
}

let input =
`
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
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
        assert.strictEqual(result, '165', "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();
