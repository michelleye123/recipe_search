// Global app controller

import axios from 'axios';


/*
how forkify-api differs from food2fork api:
- no API key required
- no proxy required
- url = forkify-api.herokuapp.com;

Recipe.js
replace:
const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);
with:
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

Search.js
replace:
const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`)
with:
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
*/
async function getResult(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
        console.log(res.data.recipes);
    } catch (err) {
        console.log('axios err:',err);
    }
}

getResult('basil');