import {
    elements
} from './base';
import {
    Fraction
} from 'fractional';

export const clearResults = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if (count) {
        return new Fraction(count);
    }
    return '';
};

// TODO fix various parsing errors: recurring decimals, section headings eg "For the dressing:", accept any unit after a number (eg 1 clove, 2 cans)
const createIngred = ingO => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingO.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingO.unit}</span>
            ${ingO.ing}
        </div>
    </li>
`;

export const updateIngredAmounts = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
//    document.querySelector(".recipe__ingredient-list").innerHTML = '';
//    document.querySelector(".recipe__ingredient-list").insertAdjacentHTML('afterBegin', recipe.ingreds.map(el => createIngred(el)).join(''));

    const countE = Array.from(document.querySelectorAll('.recipe__count'));
    countE.forEach((el, ind) => {
        el.textContent = formatCount(recipe.ingreds[ind].count);
    });
};

export const renderRecipe = recipe => {
    console.log(recipe);
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.prepTime}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingreds.map(el => createIngred(el)).join('')}
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
    elements.recipe.insertAdjacentHTML('afterBegin', markup);
};
