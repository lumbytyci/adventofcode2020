const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    let lines = input.trim().split('\n\n').map(l => l.split('\n'));
    lines[0].shift();
    lines[1].shift();
    let deck1 = lines[0].map(n => parseInt(n));
    let deck2 = lines[1].map(n => parseInt(n));

    while (deck1.length > 0 && deck2.length > 0) {
        let draw1 = deck1.shift();
        let draw2 = deck2.shift();

        if (draw1 > draw2) {
            deck1.push(draw1);
            deck1.push(draw2);
        } else {
            deck2.push(draw2);
            deck2.push(draw1);
        }
    }

    let winner = deck1.length !== 0 ? deck1 : deck2;
    let score = 0;

    for (let i = winner.length; i > 0; i--) {
        score += (i * winner[winner.length - i]);
    }

    return score;
}

let input =
`
Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10
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
        assert.strictEqual(result, 306, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

