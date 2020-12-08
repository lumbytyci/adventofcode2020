const fs = require('fs');

// const input =
// `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`

const input = fs.readFileSync('./input.txt', 'utf-8');

let ip = 0;
let acc = 0;
let program = [];

for (let line of input.split('\n')) {
    let s = line.split(' ');
    let instruction = { 'op' : s[0], 'arg' : parseInt(s[1]) };
    program.push(instruction);
}

const ipSet = new Set();

while (!ipSet.has(ip)) {
    ipSet.add(ip);
    let ins = program[ip];

    if (ins['op'] === 'acc') {
        ip++;
        acc += ins['arg'];
    } else if (ins['op'] === 'nop') {
        ip++;
    } else if (ins['op'] === 'jmp') {
        ip += ins['arg'];
    }
}

console.log(acc);

