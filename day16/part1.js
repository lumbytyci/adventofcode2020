const assert = require('assert').strict;
const fs = require('fs');

const FIELD_REGEX = new RegExp(/(\w+): (\d+\-\d+) or (\d+\-\d+)/g);

const toIntervals = (intervals) => {
    let outputIntervals = [];

    for (let i of intervals) {
        let nums = i.split('-').map(n => parseInt(n));
        outputIntervals.push([nums[0], nums[1]]);
    }

    return outputIntervals;
}

const getErrorRate = (ticket, fields) => {
    let errRate = 0;
    for (let n of ticket) {
        let matches = false;
        for (let f of Object.values(fields)) {
            if ((f[0][0] <= n && n <= f[0][1]) || (f[1][0] <= n && n <= f[1][1])) {
                matches = true;
            }
        }
        if (!matches) {
            errRate += n;
        }
    }

    return errRate;
}

const runPart = (input) => {
    let lines = input.trim().split(/\n\n/g);
    let fields = [...lines[0].matchAll(FIELD_REGEX)];
    let ranges = {};
    let errRate = 0;

    for (let f of fields) {
        ranges[f[1]] = toIntervals([f[2], f[3]]);
    }

    let tickets = lines[2].split('\n');
    tickets.shift();
    tickets = tickets.map(l => l.split(','));
    tickets = tickets.map(x => x.map(n => parseInt(n)));

    for (let ticket of tickets) {
        errRate += getErrorRate(ticket, ranges);
    }

    return errRate;
}

let input =
`
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
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
        assert.strictEqual(result, 71, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

