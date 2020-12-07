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
    let items = [];

    for (let subBag of subBags) {
        items.push([parseInt(subBag[1]), subBag[2]]);
    }

    nodes.set(bag, items);
}

let totalBags = 0;
let toVisit = new Array([1, 'shiny gold']);

while (toVisit.length > 0) {
    const [n, color] = toVisit.shift();
    totalBags += n;

    for (let bags of nodes.get(color)) {
        let [n2, color2] = bags;
        toVisit.push([n * n2, color2]);
    }
}

totalBags--; // Remove the first shiny bag

console.log(totalBags);

