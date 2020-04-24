/*
how forkify-api differs from food2fork api:
- no API key required
- no proxy required
- url = forkify-api.herokuapp.com;

Search.js
replace:
const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`)
with:
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
*/

export default 5;