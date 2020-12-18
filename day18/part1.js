const assert = require('assert').strict;
const fs = require('fs');

const evalExpr = (expr) => {
    let s = expr.split(' ');
    let res = parseInt(s[0]);

    for (let i = 1; i < s.length; i += 2) {
        let op = s[i];
        let num = s[i + 1];

        if (op === '+') {
            res += parseInt(num);
        } else if (op === '*') {
            res *= parseInt(num);
        }
    }

    return res;
}

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let sum = 0;

    const GROUP_REGEX = new RegExp(/\(([^\(\)]+)\)/g);

    for (let expr of lines) {
        let group = [...expr.matchAll(GROUP_REGEX)];
        while (group.length > 0) {
            let currGroup = group[0];
            let subExpr = evalExpr(currGroup[1]);

            expr = expr.substring(0, currGroup.index)
                                + subExpr.toString()
                                + expr.substring(currGroup.index + currGroup[0].length);

            group = [...expr.matchAll(GROUP_REGEX)];
        }
        sum += evalExpr(expr);
    }

    return sum;
}

let input =
`
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
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
        assert.strictEqual(result, 13632, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

