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

let data = input.split(/\n\n/g);

let totalIntersection = 0;

for (let group of data) {
    let subGroups = group.split('\n');
    let subg = new Set(subGroups[0]);
    for (let s of subGroups.slice(1)) {
        s = new Set(s);
        subg = new Set([...subg].filter(x => s.has(x)));
    }

    totalIntersection += subg.size;
}

console.log(totalIntersection);
