import Search from './Search';
import * as searchView from './searchView';
import {
    elements,
    showLoader,
    hideLoader
} from './base';

/* GLOBAL STATE */
const state = {
    // search: search obj,
    // cur recipe
    // shopping list
    // liked recipes
}

const controlSearch = async (query) => {
    if (query) {
//        searchView.clearInput();
        showLoader(elements.searchRes);

        state.search = new Search(query);
        let status = await state.search.getResult();

        if (status) {
            searchView.renderResults(state.search.result, 1, 5);
        } else {
            searchView.clearResults();
            // alert('hmm something went wrong!');
        }
        hideLoader();
    }
}

elements.searchForm.addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(searchView.getInput());
})

elements.searchPageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.renderResults(state.search.result, goToPage)
    }
});

/* for dev purposes */
window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch('salad');
})
