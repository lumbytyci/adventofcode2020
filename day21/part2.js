const assert = require('assert').strict;
const fs = require('fs');

const runPart = (input) => {
    const lines = input.trim().split('\n');
    const recipe = {};

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
    }

    const mappedIngredients = {};
    let entries = Object.entries(recipe)
    while (entries.length > 0) {
        for (const [k, v] of entries) {
            if (v.size === 1) {
                mappedIngredients[k] = v.values().next().value;
                delete recipe[k];

                for (const rSet of Object.values(recipe)) {
                    if (rSet.has(mappedIngredients[k])) {
                        rSet.delete(mappedIngredients[k]);
                    }
                }
            }
        }

        entries = Object.entries(recipe);
    }

    const answer = Object.entries(mappedIngredients)
        .sort((a,b) => a[0] > b[0] ? 1 : -1)
        .map(e => e[1]).join(',');

    console.log('Canonical dangerous ingredient list:', answer);

    return answer;
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
        assert.strictEqual(result, 'mxmxvkd,sqjhc,fvjkl', "Incorrect result!");
    }

    console.log("[Result: %d]", result);
    console.info('[Execution time (hr): %ds %dms]', hrend[0], hrend[1] / 1000000)
}

run();

