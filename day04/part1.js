const fs = require('fs');

// const input =
// 
// `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm
// 
// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929
// 
// hcl:#ae17e1 iyr:2013
// eyr:2024
// ecl:brn pid:760753108 byr:1931
// hgt:179cm
// 
// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in`

const input = fs.readFileSync('./input.txt', 'utf-8');

const reqFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']);

let validCount = 0;

let passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '));

for(let p of passports) {

    let fields = [];
    let fieldSplit = p.split(' ');

    for (let f of fieldSplit) {
        let field = f.split(':')[0];
        fields.push(field);
    }

    console.log(fields.length, reqFields.size);

    if ((fields.length === reqFields.size)
        || (fields.length == reqFields.size -1 && !fields.includes('cid'))) {
            validCount++;
        }
}

console.log(validCount);

