import Search from './Search';
import Recipe from './Recipe';
import Shoplist from './Shoplist';
import * as searchView from './searchView';
import * as recipeView from './recipeView';
import * as shoplistView from './shoplistView';
import {
    elements,
    showLoader,
    hideLoader
} from './base';

/* GLOBAL STATE */
const state = {
    // state.search
    // state.recipe
    // state.shoplist
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

const controlShoplist = () => {
    if (!state.shoplist) state.shoplist = new Shoplist();
    
    state.recipe.ingreds.forEach( e => {
        const item = state.shoplist.addItem(e.count, e.unit, e.ing);
        shoplistView.renderItem(item);
    })
}


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
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlShoplist();
    };
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        shoplistView.deleteItem(id);
        state.shoplist.deleteItem(id);
    }else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    
    };
});

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
});


