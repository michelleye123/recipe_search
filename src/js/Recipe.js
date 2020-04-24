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
*/