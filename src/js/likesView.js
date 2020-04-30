import {elements} from './base';
import { limitRecipeTitle } from './searchView';

export const toggleRecipeLikeBtn = show => {
    const icon = show ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', 'img/icons.svg#'+icon);
}

export const toggleLikeMenu = show => {
    elements.likesDropdown.style.visibility = show ? 'visible' : 'hidden';
}

export const addToLikeMenu = like => {
    console.log(like);
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image_url}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('afterBegin', markup);
}

// TODO fix bug of retrieval of recipe from a different page...
