import { displayTableNames } from './table names/displayTableNames.js';
import { liClicked } from './table names/liClicked.js';
import { searchForWord } from './search/searchForWord.js';

// Tables on left
// const envdata = await window.api.setEnv();
// console.log(envdata);
const data = await window.api.sendTableNames();
console.log(data);
async function work() {
    if(data) {
        await displayTableNames(data);
        await liClicked();
        searchForWord();
    }
}
await work();