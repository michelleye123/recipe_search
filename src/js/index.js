import Search from './Search';

/* GLOBAL STATE */
const state = {
    // search obj
    
    //search: search obj,
    
    // cur recipe
    // shopping list
    // liked recipes
}

const controlSearch = async (eventObj) => {
//    console.log(eventObj,'lol u wanna search something');
    // read search query
    const query = 'basil';

    if (query) {
        // store search query into state
        state.search = new Search(query);
        
        // prepare UI - clean old data
    
        // call search.js => API
        await state.search.getResult();

        // read + store search result
        // UI display search result
        let s = '';
        state.search.result.forEach( (e, i) => {
            s += `${i}: ${e.title}.`;
        })
        console.log(s);
        
    }
    
    
}



document.querySelector('.search').addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(eventObj);
})

/* dev */
window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(eventObj);
})