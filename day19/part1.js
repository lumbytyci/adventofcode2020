const assert = require('assert').strict;
const fs = require('fs');

let rules = {};

const expandRule = (rule) => {
    if (rules[rule] && rules[rule].startsWith('"')) {
        return rules[rule].charAt(1);
    } else if (rule === '|') {
        return rule;
    }

    let pattern = '';
    for (let r of rules[rule].split(' ')) {
        pattern += expandRule(r);
    }

    return `(${pattern})`
}

const runPart = (input) => {
    const [splitRules, splitMessages] = input.trim().split('\n\n');

    for (let rule of splitRules.trim().split('\n')) {
        let sRule = rule.split(':');
        rules[sRule[0]] = sRule[1].trim();
    }

    let zeroRule = '^' + expandRule('0') + '$';
    let messages = splitMessages.trim().split('\n');

    let count = 0;
    for (let m of messages) {
        if (m.match(zeroRule)) {
            count++;
       }
    }

    return count;
}

let input =
`
0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb
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
        assert.strictEqual(result, 2, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

