/*
how forkify-api differs from food2fork api:
- no API key required
- no proxy required
- url = forkify-api.herokuapp.com;

Recipe.js
replace:
const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);
with:
//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

*/

import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
            //            console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingreds = res.data.recipe.ingredients;
            return true;
        } catch (err) {
            console.log('Error retrieiving recipe:', err);
            return false;
        }
    }

    calcPrepTime() { // in minutes
        // TODO make this way better
        this.prepTime = this.ingreds.length * 2;
    }

    calcServings(increment) {
        if (increment === undefined) {
            this.servings = 4;
        } else if (increment < 0 && this.servings <= 1) {
            alert('Reached minimum servings');
        } else {
            this.servings += increment;
        }
    }

    calcIngredAmounts(oldServing, newServing) {
        //        console.log(this.ingreds);
        this.ingreds.forEach(el => {
            el.count *= newServing / oldServing;
        });
    }

    controlServings(sign) {
        const increment = 1;
        let oldServing = this.servings;
        if (sign === '+') {
            this.calcServings(increment);
        } else if (sign === '-') {
            this.calcServings(-increment);
        }
        this.calcIngredAmounts(oldServing, this.servings);
    };

    // TODO fix various parsing errors: recurring decimals, section headings eg "For the dressing:", accept any unit after a number (eg 1 clove, 2 cans)
    parseIngreds() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'kilograms', 'grams'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'kg', 'g']

        const newArr = this.ingreds.map(el => {
            let ing = el.toLowerCase();

            unitLong.forEach((unit, index) => {
                ing = ing.replace(unit, unitShort[index]);
            });

            // remove "()"
            ing = ing.replace(/ *\([^)]*\) */g, ' ');


            const ingA = ing.split(' ');
            const iUnit = ingA.findIndex(el2 => unitShort.includes(el2));


            let ingO;

            // ingredient has a unit
            if (iUnit > -1) {
                const arrCount = ingA.slice(0, iUnit);
                let count;
                if (arrCount.length === 1) {
                    // quantities such as "1" or "1-1/4"
                    count = eval(ingA[0].replace('-', '+'));
                } else {
                    // quantities such as "1" or "1 1/4"
                    count = eval(ingA.slice(0, iUnit).join('+'));
                }
                ingO = {
                    count,
                    unit: ingA[iUnit],
                    ing: ingA.slice(iUnit + 1).join(' '),
                }

                // no unit, starts with number
            } else if (parseInt(ingA[0], 10)) {
                ingO = {
                    count: parseInt(ingA[0], 10),
                    unit: '',
                    ing: ingA.slice(1).join(' ')
                }
                // no unit and doesn't with number
            } else if (iUnit === -1) {
                ingO = {
                    count: 1,
                    unit: '',
                    ing
                }
            }
            return ingO;
        });
        this.ingreds = newArr;
    }
}
