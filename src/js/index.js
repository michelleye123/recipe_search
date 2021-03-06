import Search from './Search';
import Recipe from './Recipe';
import Shoplist from './Shoplist';
import Likes from './Likes';
import * as searchView from './searchView';
import * as recipeView from './recipeView';
import * as shoplistView from './shoplistView';
import * as likesView from './likesView';
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
    // state.likes
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
            if (state.like) likesView.toggleRecipeLikeBtn(state.like.isLiked(state.recipe.id));
        } else {
            // 
        }
        hideLoader();
    } else {

    }
};

const controlShoplist = () => {
    if (!state.shoplist) state.shoplist = new Shoplist();

    state.recipe.ingreds.forEach(e => {
        const item = state.shoplist.addItem(e.count, e.unit, e.ing);
        shoplistView.renderItem(item);
    })
}

const controlLikes = () => {
    const id = state.recipe.id;
    //    if (!state.like) state.like = new Likes();

    const like = state.likes.toggleLike(state.recipe);
    const liked = state.likes.isLiked(state.recipe.id);

    console.log('80', liked);

    liked ? likesView.addToLikeMenu(like) : likesView.removeFromLikeMenu(state.recipe.id);
    likesView.toggleRecipeLikeBtn(liked);
    likesView.toggleLikeMenu(state.likes.getNumLikes() > 0);
}

elements.searchForm.addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(searchView.getInput());
});

window.addEventListener('hashchange', controlRecipe);

elements.recipe.addEventListener('click', e => {
    // ".classname *" will pick up the child elements of the class
    const t = e.target;
    console.log(state.recipe);
    //    console.log(e.target.matches, clickedOn);
    if (t.matches('.btn-increase, .btn-increase *')) {
        state.recipe.controlServings('+');
        recipeView.updateIngredAmounts(state.recipe);
    } else if (t.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.controlServings('-');
        recipeView.updateIngredAmounts(state.recipe);
    } else if (t.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShoplist();
    } else if (t.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    };
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        shoplistView.deleteItem(id);
        state.shoplist.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.shoplist.updateCount(id, val);
    };
});

elements.searchPageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.renderResults(state.search.result, goToPage)
    }
});

window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch('salad'); // for dev purposes
    state.likes = new Likes();
    //    console.log(1, state.likes);
    state.likes.readStorage();
    //    console.log(2, state.likes);
    likesView.toggleLikeMenu(state.likes.getNumLikes() > 0);
    state.likes.likes.forEach(like => likesView.addToLikeMenu(like));
});
