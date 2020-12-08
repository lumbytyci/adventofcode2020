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

let program = [];

for (let line of input.split('\n')) {
    let s = line.split(' ');
    let instruction = { 'op' : s[0], 'arg' : parseInt(s[1]) };
    program.push(instruction);
}


for (let idx in program) {
    let ip = 0;
    let acc = 0;
    let ipSet = new Set();
    let newProgram = JSON.parse(JSON.stringify(program)); // deep clone

    if(newProgram[idx]['op'] === 'nop') {
        newProgram[idx]['op'] = 'jmp';
    } else if (newProgram[idx]['op'] === 'jmp') {
        newProgram[idx]['op'] = 'nop';
    }

    while (!ipSet.has(ip) && ip < newProgram.length) {
        ipSet.add(ip);
        let ins = newProgram[ip];

        if (ins['op'] === 'acc') {
            ip++;
            acc += ins['arg'];
        } else if (ins['op'] === 'nop') {
            ip++;
        } else if (ins['op'] === 'jmp') {
            ip += ins['arg'];
        }
    }

    if (ip === newProgram.length) {
        console.log(acc);
        break;
    }
}

