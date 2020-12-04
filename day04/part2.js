const fs = require('fs');

// const input =
// `eyr:1972 cid:100
// hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926
// 
// iyr:2019
// hcl:#602927 eyr:1967 hgt:170cm
// ecl:grn pid:012533040 byr:1946
// 
// hcl:dab227 iyr:2012
// ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277
// 
// hgt:59cm ecl:zzz
// eyr:2038 hcl:74454a iyr:2023
// pid:3556412378 byr:2007
// 
// pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
// hcl:#623a2f
// 
// eyr:2029 ecl:blu cid:129 byr:1989
// iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm
// 
// hcl:#888785
// hgt:164cm byr:2001 iyr:2015 cid:88
// pid:545766238 ecl:hzl
// eyr:2022
// 
// iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`


const input = fs.readFileSync('./input.txt', 'utf-8');

const reqFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']);

let validCount = 0;

let passports = input.split('\n\n').map(l => l.replace(/\n/g, ' '));

for(let p of passports) {

    let fields = {};
    let fieldSplit = p.split(' ');

    for (let f of fieldSplit) {
        let [field, val] = f.split(':');
        fields[field] = val;
    }

    let keys = Object.keys(fields);

    if (((keys.length === reqFields.size)
        || (keys.length == reqFields.size -1 && !keys.includes('cid')))
        && (1920 <= fields['byr'] && fields['byr'] <= 2002)
        && (2010 <= fields['iyr'] && fields['iyr'] <= 2020)
        && (2020 <= fields['eyr'] && fields['eyr'] <= 2030)
        && fields['hcl'].match(/^#[0-9a-z]{6}$/) != null
        && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fields['ecl'])
        && fields['pid'].match(/^[0-9]{9}$/) != null) {
            let unit = fields['hgt'].substr(fields['hgt'].length - 2);
            let height = fields['hgt'].substr(0, fields['hgt'].length - 2);

            if (unit === 'cm') {
                if (150 <= height && height <= 193) validCount++;
            } else if (unit === 'in') {
                if (59 <= height && height <= 76) validCount++;
            }
        }
}

console.log(validCount);

