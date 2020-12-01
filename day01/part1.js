const fs = require('fs')

const numbers = fs.readFileSync('./input.txt', 'utf-8')
                    .split('\n')
                    .map((line) => parseInt(line));

const numSet = new Set();

numbers.forEach(x => {
    numSet.add(x);
    if (numSet.has(2020 - x)) {
        console.log((2020 - x) * x);
    }
});

