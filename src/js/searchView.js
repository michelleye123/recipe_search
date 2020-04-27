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

export const renderResults = recipes => {
    //    console.log(recipes);
    recipes.forEach(renderRecipe);
};
