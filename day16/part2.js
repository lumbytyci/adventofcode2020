const assert = require('assert').strict;
const fs = require('fs');

const FIELD_REGEX = new RegExp(/(\w+\s*\w*): (\d+\-\d+) or (\d+\-\d+)/g);

const toIntervals = (intervals) => {
    let outputIntervals = [];

    for (let i of intervals) {
        let nums = i.split('-').map(n => parseInt(n));
        outputIntervals.push([nums[0], nums[1]]);
    }

    return outputIntervals;
}

const determineFields = (tickets, fields) => {
    let positions = new Map();

    for (let f of Object.entries(fields)) {
        let r = f[1];
        for (let i = 0; i < tickets[0].length; i++) {
            let matchesAll = true;
            for (let t of tickets) {
                if (!((r[0][0] <= t[i] && t[i] <= r[0][1])
                    || (r[1][0] <= t[i] && t[i] <= r[1][1]))) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                if (!positions.has(i)) positions.set(i, []);
                positions.get(i).push(f[0]);
            }
        }
    }

    return positions;
}

const isValidTicket = (ticket, fields) => {
    for (let n of ticket) {
        let matches = false;
        for (let f of Object.values(fields)) {
            if ((f[0][0] <= n && n <= f[0][1]) || (f[1][0] <= n && n <= f[1][1])) {
                matches = true;
            }
        }

        if (!matches) {
            return false;
        }
    }

    return true;
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

    validTickets = tickets.filter(t => isValidTicket(t, ranges));
    let possible = determineFields(validTickets, ranges);
    let myTicket = lines[1].split('\n').pop().split(',').map(n => parseInt(n));
    let pos = new Map();

    while (possible.size > 0) {
        for (const [k, v] of possible) {
            if (v.length === 1) {
                let key = v[0];
                pos.set(key, k);
                possible.delete(k);
                for (pv of possible.values()) {
                    let idx  = pv.indexOf(key);
                    pv.splice(idx, 1);
                }
            }
        }
    }

    let departurePos = [];
    pos.forEach((v,k) => {
        if (k.startsWith('dep')) departurePos.push(v);
    });

    let result = 1;
    for (let i of departurePos) {
        result *= myTicket[i];
    }

    return result;
}

/* Doesn't work with test input*/
let input =
`
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
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
        assert.strictEqual(result, 11 * 12 * 13, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

