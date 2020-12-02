const fs = require('fs');

//const input = [
//               "1-3 a: abcde",
//               "1-3 b: cdefg",
//               "2-9 c: ccccccccc"
//              ]

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const numOfOccurrence = (input, c) => {
    let n = 0;

    for (let chr of input) {
        if (chr === c) n++;
    }

    return n;
}

let validCount = 0;

for (let line of input) {
    const [r, chr, p] = line.split(' ');
    const [startR, endR] = r.split('-');
    const c = chr.substring(0,1);

    const num = numOfOccurrence(p, c);

    if (p.charAt(startR - 1) != c ^ p.charAt(endR - 1) != c) validCount++;
}

console.log(validCount);
