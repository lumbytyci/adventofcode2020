const fs = require('fs');

// const input =
// `light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.`

const input = fs.readFileSync('./input.txt', 'utf-8');

const bagReg = new RegExp(/^(\w+ \w+) bags contain (.*).$/);
const containsReg = new RegExp(/(\d+) (\w+ \w+)/g);

let nodes = new Map();

for (let line of input.split('\n')) {
    let groups = line.match(bagReg);
    let bag = groups[1];
    let subBags = [...groups[2].matchAll(containsReg)];

    for (let subBag of subBags) {
        if (!nodes.has(subBag[2])) {
            nodes.set(subBag[2], []);
        }
        nodes.get(subBag[2]).push(bag);
    }
}

let visited = new Set();
let toVisit = nodes.get('shiny gold');

while (toVisit.length > 0) {
    let next = toVisit.shift();

    if (!visited.has(next)) {
        visited.add(next);
        let toAdd = nodes.get(next);
        if (toAdd !== undefined) toVisit.push(...toAdd);
    }
}

console.log(visited, visited.size);

