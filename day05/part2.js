const fs = require('fs');

// const input =
// `BFFFBBFRRR
// FFFBBBFRRR
// BBFFBBFRLL`.split('\n');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let allIds = new Set([...Array(1024).keys()]);
let myId;

for (let boardPass of input) {
    let row = parseInt(boardPass.substring(0, 7).replace(/B/g, '1').replace(/F/g,'0'), 2);
    let col = parseInt(boardPass.substring(7).replace(/R/g, '1').replace(/L/g,'0'), 2);

    allIds.delete(row * 8 + col);
}

for (let id of allIds) {
    if (!allIds.has(id - 1) && !allIds.has(id + 1)) {
        myId = id;
    }
}

console.log(myId);

