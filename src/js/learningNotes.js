/*  IMPORT  */

// import way 1
import y from './Search';
//console.log(`imported ${y} from another    module, like magic!`);

/* import way 2
console.log(x, 'well thats interesting!');
import {add as a, multi, x} from './searchView';
console.log(x,y, a(x,y), multi(x,y));
*/

//import way 3
import * as searchView from './searchView';
//console.log(searchView.x,y, searchView.add(searchView.x,y), searchView.multi(searchView.x,y));
