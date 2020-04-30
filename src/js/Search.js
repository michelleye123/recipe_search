import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
        // this.result
    }

    async getResult() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
            return true;

        } catch (err) {
            console.log('Error retrieiving search results:', err);
            alert(`Regrettably, there are no recipes for ${this.query} at this time :-(`);
            return false;
        }
    }
}
