import { elements } from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => { // if no {}, function will return a value
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML ='';
}

const renderRecipe = recipe => {
//    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src=${recipe.image_url} alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    if (recipe.recipe_id === '3633b2') {
        console.log(markup)
    }
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    console.log(recipes);
    recipes.forEach(renderRecipe);
};
