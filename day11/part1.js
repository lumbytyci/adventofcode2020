const assert = require('assert').strict;
const fs = require('fs');

/*
    Execution time: 249.928ms
*/

const runPart = (input) => {
    let lines = input.trim().split('\n');
    let grid = lines.map(l => l.split(''));
    let prevGrid;
    let hasChanged = false;
    let occupiedCount = 0;

    while (true) {
        prevGrid = JSON.parse(JSON.stringify(grid));
        hasChanged = false;

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                occupiedCount = 0;
                if (prevGrid[x][y] === '.') continue;
                for (let dx of [-1, 0, 1]) {
                    for (let dy of [-1, 0, 1]) {
                        if (!(dx === 0 && dy === 0) && prevGrid[x + dx] && prevGrid[x + dx][y + dy]
                            && prevGrid[x + dx][y + dy] === '#') {
                                occupiedCount++;
                        }
                    }
                }

                if (prevGrid[x][y] === 'L' && occupiedCount === 0) {
                    grid[x][y] = '#';
                    hasChanged = true;
                } else if (prevGrid[x][y] === '#' && occupiedCount >= 4) {
                    grid[x][y] = 'L';
                    hasChanged = true;
                }
            }
        }

        if (!hasChanged) break;
    }

    let result = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] === '#') result++;
        }
    }

    return result;
}

let input =
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log("<<<Running with user input>>>");
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 37, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

