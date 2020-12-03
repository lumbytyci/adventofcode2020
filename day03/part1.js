const fs = require('fs');

// const input = [
//                 "..##.......",
//                 "#...#...#..",
//                 ".#....#..#.",
//                 "..#.#...#.#",
//                 ".#...##..#.",
//                 "..#.##.....",
//                 ".#.#.#....#",
//                 ".#........#",
//                 "#.##...#...",
//                 "#...##....#",
//                 ".#..#...#.#"
//                 ];

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let answer = 0;

let trackLength = input[0].length;
let x_delta = 3;
let y_delta = 1;
let x = (0 + x_delta) % trackLength;
let y = 0 + y_delta;


while (y < input.length) {
    if (input[y][x] === '#') answer++;

    y += y_delta;
    x = (x + x_delta) % trackLength;
}

console.log(answer);

