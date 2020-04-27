import Search from './Search';
import * as searchView from './searchView';
import {
    elements,
    showLoader,
    hideLoader
} from './base';

/* GLOBAL STATE */
const state = {
    //search: search obj,
    // cur recipe
    // shopping list
    // liked recipes
}

const controlSearch = async (query = "salad") => {

    if (query) {
        searchView.clearInput();
        searchView.clearResults();
        showLoader(elements.searchRes);

        state.search = new Search(query);
        let status = await state.search.getResult();

        //        console.log(status, state.search.result);
        // read + store search result
        // UI display search result
        //        let s = '';
        //        state.search.result.forEach( (e, i) => {
        //            s += `${i}: ${e.title}.`;
        //        })

        if (status) {
            searchView.renderResults(state.search.result);
        } else {
            //            alert('hmm something went wrong!');
        }
        hideLoader();


    }


}



elements.searchForm.addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(searchView.getInput());
})

/* dev */
window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch();
})
