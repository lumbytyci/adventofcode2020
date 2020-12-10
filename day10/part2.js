const assert = require('assert').strict;
const fs = require('fs');

// Sprinkle a tad of dynamic programming...
const runPart = (input) => {
    let nums = input.trim().split('\n').map(l => parseInt(l));
    nums.push(0);
    nums.push(Math.max(...nums) + 3);

    let highest = nums[nums.length - 1];
    let mem = new Array(highest + 1).fill(0);

    mem[0] = 1;

    if (nums.includes(1)) {
        mem[1] = 1;
    }

    if (nums.includes(2) && nums.includes(1)) {
        mem[2] = 2;
    } else if (nums.includes(2)) {
        mem[2] = 1;
    }

    for (let i = 3; i <= highest; i++) {
        if (!nums.includes(i)) {
            continue;
        }

        mem[i] = mem[i - 3] + mem[i - 2] + mem[i - 1];
    }

    return mem[highest];
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
        assert.strictEqual(result, 8, "Incorrect result!");
        assert.strictEqual(result2, 19208, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

