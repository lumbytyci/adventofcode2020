const fs = require('fs');

// const input =
// `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`

const input = fs.readFileSync('./input.txt', 'utf-8');

const nums = input.split('\n').map(n => parseInt(n));

const generateCombinations = (nums) => {
    const pairs = [];

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            pairs.push([nums[i], nums[j]]);
        }
    }

    return pairs;
}

let invalidNum;
let preambleCount = 25; // It's 5 for the example input

for (let i = preambleCount; i < nums.length; i++) {
    let nPrev = nums.slice(i - preambleCount, i);
    let pairs = generateCombinations(nPrev);

    let isValidNum = false;

    for (let pair of pairs) {
        if (pair[0] + pair[1] === nums[i]) {
            isValidNum = true;
            break;
        }
    }

    if (!isValidNum) {
        invalidNum = nums[i];
        break;
    }
}

console.log("Invalid number: ", invalidNum);

let resultSet;

for (let i = -1; i < nums.length - 1; i++) {
    let subNums = [];
    let total = 0;

    for (let j = i + 1; j < nums.length; j++) {

       total += nums[j];

       if (total != invalidNum && total < invalidNum) {
            subNums.push(nums[j]);
       } else if (total === invalidNum) {
            subNums.push(nums[j]);
            resultSet = subNums;
            break;
       } else {
            break;
       }
    }

    if (resultSet) break;
}

resultSet.sort((a, b) => a - b);
console.log("Encryption weakness: ", resultSet[0] + resultSet[resultSet.length - 1]);

