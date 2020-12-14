const assert = require('assert').strict;
const fs = require('fs');

const getXsIndexes = (mask) => {
    let indexes = [];

    for (let i = 0; i < mask.length; i++) {
        if (mask.charAt(i) === 'X') indexes.push(i);
    }

    return indexes;
}

const generateMaskCombinations = (mask) => {
    let indexes = getXsIndexes(mask);
    let masks = [];

    for (let i = 0; i < Math.pow(2, indexes.length); i++) {
        let orMask = BigInt(0), andMask = BigInt(-1);
        for (let j = 0; j < indexes.length; j++) {
            let bit = (BigInt(i) & (1n << BigInt(j) )) >> BigInt(j);
            if (bit) {
                orMask |= 1n << BigInt(mask.length - 1 - indexes[j]);
            } else {
                andMask &= ~(1n << BigInt((mask.length - 1 - indexes[j])));
            }
        }
        masks.push([orMask, andMask]);
    }

    return masks;
}

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let combs = [];
    let mem = {};
    let oneTimeMask = 0;

    const MATCH_MEM = new RegExp(/^mem\[(\d+)\] = (\d+)$/);

    for (let line of lines) {
        if (line.startsWith('mask')) {
            let rawMask = line.split(' ')[2];
            oneTimeMask = BigInt('0b' + rawMask.replace(/X/g, '0'), 2);
            combs = generateMaskCombinations(rawMask);
        } else if (line.startsWith('mem')) {
            let match = line.match(MATCH_MEM);
            let memOffset = BigInt(match[1]);
            let memValue = BigInt(match[2]);

            memOffset |= oneTimeMask;

            for (let c of combs) {
               memOffset = (memOffset | c[0]) & c[1];
               mem[memOffset] = memValue;
            }

        }
    }
    let sum = 0n;
    for (let i of Object.values(mem)) {
        sum += i;
    }

    return sum;
}

let input =
`
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
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
        assert.strictEqual(result, 208n, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();
