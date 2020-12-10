const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let nums = input.trim().split('\n').map(l => parseInt(l));
    nums = nums.sort((x, y) => x - y); // sort asc

    let diffs = {};
    let prev = 0;

    for (let rating of nums) {
        if (!diffs[rating - prev]) diffs[rating - prev] = 0;
        diffs[rating - prev] += 1;
        prev = rating;
    }

    return diffs[1] * (diffs[3] + 1);
}

let input =
`16
10
15
5
1
11
7
19
6
12
4`

let input2 =
`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log("<<<Running with user input>>>");
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    let result2 = runPart(input2);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 35, "Incorrect result!");
        assert.strictEqual(result2, 220, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

