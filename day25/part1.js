const assert = require('assert').strict;
const fs = require('fs');

/*
    For part2 you just have to click a button
*/

const transform = (subjectNumber, loopSize) => {
    const divider = 20201227;
    let value = 1;

    for (let i = 0; i < loopSize; i++) {
        value *= subjectNumber;
        value %= divider;
    }

    return value;
}

const reverseTransform = (publicKey, subjectNumber=7) => {
    const divider = 20201227;
    let value = 1;
    let loopSize = 0;

    while (value !== publicKey) {
       value *= subjectNumber;
       value %= divider;
       loopSize++;
    }

    return loopSize;
}

const runPart = (input) => {
    let lines = input.trim().split('\n');
    const cardPubKey = parseInt(lines[0]);
    const doorPubKey = parseInt(lines[1]);

    const cardLoopSize = reverseTransform(cardPubKey);
    const doorLoopSize = reverseTransform(doorPubKey);

    return transform(cardPubKey, doorLoopSize);
}

let input =
`
5764801
17807724

`
const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log('<<<Running with user input>>>');
    }

    const start = new Date(), hrstart = process.hrtime();
    const result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 14897079, 'Incorrect result!');
    }

    console.log('[Result: %d]', result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

