export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchPageButtons: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesDropdown: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

const elementstrings = {
    // for elements that can't go into const elements because they don't always exist
    loader: 'loader',
};


export const showLoader = parent => {
    const loader = `
        <div class='${elementstrings.loader}'>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterBegin', loader);
};

export function hideLoader() {
    const loader = document.querySelector('.' + elementstrings.loader);
    if (loader) loader.parentElement.removeChild(loader);
};
