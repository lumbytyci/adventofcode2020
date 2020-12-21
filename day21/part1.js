const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    const lines = input.trim().split('\n');
    const recipe = {};
    const ingredientCounts = {};

    for (const line of lines) {
        const [allergens, ingredients] = line
            .replace(/[\(\)]+/g, '')
            .split(' contains ')
            .map(l => l.split(/[\s,]+/g));

        for (const i of ingredients) {
            if (recipe[i]) {
                recipe[i] = new Set(allergens.filter(a => recipe[i].has(a)));
            } else {
                recipe[i] = new Set(allergens);
            }

        }

        for (const a of allergens) {
            if(!ingredientCounts[a]) {
                ingredientCounts[a] = 1;
            } else {
                ingredientCounts[a]++;
            }
        }
    }

    let safeIngredients = new Set();
    for (const r of Object.values(recipe)) {
        safeIngredients = new Set([...safeIngredients, ...r]);
    }

    let count = 0;
    for (const [i,n] of Object.entries(ingredientCounts)) {
        if (!safeIngredients.has(i)) count += n;
    }

    return count;
}

let input =
`
mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)
`
const run = () => {
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf-8').trim();
        console.log("<<<Running with user input>>>");
    }


    const start = new Date(), hrstart = process.hrtime();
    let result = runPart(input);
    const hrend = process.hrtime(hrstart), end = new Date() - start;

    if (!process.argv[2]) {
        assert.strictEqual(result, 5, "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

