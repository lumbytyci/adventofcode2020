const assert = require('assert').strict;
const fs = require('fs');

/*
    Execution time: 1.510s
*/

const play = (deck1, deck2) => {
    const prevGames = new Set();


    while (deck1.length > 0 && deck2.length > 0) {
       const serialized = `${JSON.stringify(deck1)}-${JSON.stringify(deck2)}`
       if (prevGames.has(serialized)) {
            return { winner: 1, deck: deck1 };
        }

        prevGames.add(serialized);

        const draw1 = deck1.shift();
        const draw2 = deck2.shift();
        let winner;

        if (deck1.length >= draw1 && deck2.length >= draw2) {
            winner = play(deck1.slice(0, draw1), deck2.slice(0, draw2)).winner;
        } else {
            winner = draw1 > draw2 ? 1 : 2;
        }

        if (winner === 1) {
            deck1.push(draw1);
            deck1.push(draw2);
        } else {
            deck2.push(draw2);
            deck2.push(draw1);
        }
    }

    return {
        winner: deck1.length > 0 ? 1 : 2,
        deck: deck1.length > 0 ? deck1 : deck2
    };
}

const runPart = (input) => {
    let lines = input.trim().split('\n\n').map(l => l.split('\n'));
    lines[0].shift();
    lines[1].shift();
    let deck1 = lines[0].map(n => parseInt(n));
    let deck2 = lines[1].map(n => parseInt(n));

    const winner = play(deck1, deck2).deck;
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
        assert.strictEqual(result, 291, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

