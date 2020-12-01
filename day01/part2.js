const fs = require('fs')

const numbers = fs.readFileSync('./input.txt', 'utf-8')
                    .split('\n')
                    .map((line) => parseInt(line));

for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
            if (numbers[i] + numbers[j] + numbers[k]  === 2020) {
                console.log(numbers[i] * numbers[j] * numbers[k]);
            }
        }
    }
}

