const fs = require('fs');

// const input =
// `abc
// 
// a
// b
// c
// 
// ab
// ac
// 
// a
// a
// a
// a
// 
// b`;

const input = fs.readFileSync('./input.txt', 'utf-8');

let data = input.split(/\n\n/g).map(l => l.replace(/\n/g, ''));

let totalUnion = 0;

for (let group of data) {
    totalUnion += new Set(group.split('')).size;
}

console.log(totalUnion);
