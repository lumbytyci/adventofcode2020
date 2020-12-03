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

const calculateSlope = (xD, yD) => {
    let answer = 0;

    let trackLength = input[0].length;
    let x_delta = xD;
    let y_delta = yD;
    let x = (0 + x_delta) % trackLength;
    let y = 0 + y_delta;


    while (y < input.length) {
        if (input[y][x] === '#') answer++;

        y += y_delta;
        x = (x + x_delta) % trackLength;
    }

    return answer
}

let total = calculateSlope(1, 1) *
            calculateSlope(3, 1) *
            calculateSlope(5, 1) *
            calculateSlope(7, 1) *
            calculateSlope(1, 2);

console.log(total);

