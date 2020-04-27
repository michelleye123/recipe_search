import {
    elements
} from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => { // if no {}, function will return a value
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

const clearButtons = () => {
    elements.searchPageButtons.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 25) => {
    if (title.length > limit) {
        const arr = title.split(' ');
        const newarr = [];
        const end = arr.reduce((accumulator, current) => {
            if (accumulator + current.length + 1 <= limit) {
                newarr.push(current);
            }
            return accumulator + current.length + 1;
        }, 0);
        const t = newarr.join(' ');
        return newarr.join(' ') + ' ...';
    }
    return title;
};

const renderRecipe = recipe => {
    //    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src=${recipe.image_url} alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButtonHtml = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1 : page+1 }>
        <span>Page ${type==='prev' ? page-1 : page+1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right' }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, nRes, resPerPage) => {
    //    console.log('renderbuttons', page, nRes, resPerPage)
    let buttonHtml;
    const pages = Math.ceil(nRes / resPerPage);
    if (page === 1 && pages > 1) {
        buttonHtml = createButtonHtml(page, "next");
    } else if (page === pages) {
        buttonHtml = createButtonHtml(page, "prev");
    } else {
        buttonHtml = createButtonHtml(page, "prev");
        buttonHtml += createButtonHtml(page, "next");
    }
    //    console.log(elements.);
    elements.searchPageButtons.innerHTML = buttonHtml;
}

export const renderResults = (recipes, page, recipesPerPage = 5) => {
    const start = (page - 1) * recipesPerPage;
    const end = page * recipesPerPage;
    clearResults();
    clearButtons();
    //    console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, recipesPerPage);
};
