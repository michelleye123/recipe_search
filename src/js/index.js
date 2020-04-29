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
};


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
};

const controlServings = (sign) => {
    const increment = 1;
    let oldServing = state.recipe.servings;
    if (sign === '+') {
        state.recipe.calcServings(increment);
    } else if (sign === '-') {
        state.recipe.calcServings(-increment);
    }
    state.recipe.calcIngredAmounts(oldServing, state.recipe.servings);
    recipeView.updateIngredAmounts(state.recipe);
};

elements.searchForm.addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(searchView.getInput());
});

window.addEventListener('hashchange', controlRecipe);

elements.recipe.addEventListener('click', e => {
    // ".classname *" will pick up the child elements of the class
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        controlServings('+');
    } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        controlServings('-');
    };
});

elements.searchPageButtons.addEventListener('click', event => {
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
});
