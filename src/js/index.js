import Search from './Search';
import * as searchView from './searchView';
import { elements } from './base';

/* GLOBAL STATE */
const state = {
    // search obj
    
    //search: search obj,
    
    // cur recipe
    // shopping list
    // liked recipes
}

const controlSearch = async (query="pudding") => {
//    console.log(eventObj,'lol u wanna search something');
    // read search query
//    const query = 'basil';
//    const query = 'pizza' //;

    if (query) {
        // store search query into state
        state.search = new Search(query);
        
        // prepare UI - clean old data
    
        // call search.js => API
        await state.search.getResult();
        

        // read + store search result
        // UI display search result
//        let s = '';
//        state.search.result.forEach( (e, i) => {
//            s += `${i}: ${e.title}.`;
//        })
        searchView.renderResults(state.search.result);
//        console.log(state.search.result);
        
    }
    
    
}



elements.searchForm.addEventListener('submit', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch(searchView.getInput());
})

/* dev */
window.addEventListener('load', eventObj => {
    eventObj.preventDefault(); // prevent refresh
    controlSearch();
})