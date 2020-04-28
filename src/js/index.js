import Search from './Search';
import Recipe from './Recipe';
import * as searchView from './searchView';
import * as recipeView from './recipeView';
import {
    elements,
    showLoader,
    hideLoader
} from './base';

/* GLOBAL STATE */
const state = {
    // state.search
    // state.recipe
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


const controlRecipe = async () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && state.search) {
        searchView.highlightResult(hash);
        recipeView.clearResults();
        showLoader(elements.recipe);
        state.recipe = new Recipe(hash);
        const status = await state.recipe.getRecipe();
        if (status) {
            state.recipe.calcPrepTime();
            state.recipe.calcServings();
            state.recipe.parseIngreds();
            //            console.log(state.recipe.ingreds);
            recipeView.renderRecipe(state.recipe);
        } else {
            // 
        }
        hideLoader();
    } else {

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

window.addEventListener('hashchange', controlRecipe);




/* for dev purposes */
window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch('salad');
})
