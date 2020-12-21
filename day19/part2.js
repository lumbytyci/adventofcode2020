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

    let messages = splitMessages.trim().split('\n');

    let rule42 = expandRule('42');
    let rule31 = expandRule('31');

    let generalRule = new RegExp(`^(?<group42>${rule42}+)(?<group31>${rule31}+)$`);

    let count = 0;
    for (let m of messages) {
        let matches = generalRule.exec(m);
        if (matches !== null) {
            const {groups} = matches;
            let count42 = groups.group42.match(new RegExp(rule42, 'g'));
            let count31 = groups.group31.match(new RegExp(rule31, 'g'));

            if (count42.length > count31.length) count++;
        }
    }

    return count;
}

let input =
`
42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba
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
        assert.strictEqual(result, 12, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

