const assert = require('assert').strict;
const fs = require('fs');

class Tile {
    constructor(id, edges, revEdges) {
        this.id = id;
        this.edges = edges;
        this.revEdges = revEdges;
    }
}

const runPart = (input) => {
    const tilesLines = input.trim().split('\n\n');
    const tiles = [];

    for (const tile of tilesLines) {
        const lines = tile.split('\n');
        const tileId = parseInt(lines[0].split(' ')[1]);

        const edges = new Set();
        edges.add(lines[1]);
        edges.add(lines.map(x => x[0]).slice(1).join(''));
        edges.add(lines[lines.length - 1]);
        edges.add(lines.map(x => x[x.length - 1]).slice(1).join(''));

        const revEdges = new Set();
        for (const e of edges.values()) {
            revEdges.add(e.split('').reverse().join(''));
        }

        tiles.push(new Tile(tileId, edges, revEdges));
    }

    const corners = [];

    for (const [i, tile] of tiles.entries()) {
        const edges = new Set(tile.edges);
        for (const [j, pair] of tiles.entries()) {
            if (i === j) continue;

            for (const edge of edges) {
               if ([...pair.edges, ...pair.revEdges].includes(edge)) {
                    edges.delete(edge);
               }
            }
        }

        if (edges.size === 2) {
            corners.push(tile.id);
        }
    }

    return corners.reduce((acc, id) => { return acc * id });
}

let input =
`
Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...
`

const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log('<<<Running with user input>>>');
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 20899048083289, 'Incorrect result!');
    }

    console.log('[Result: %d]', result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

