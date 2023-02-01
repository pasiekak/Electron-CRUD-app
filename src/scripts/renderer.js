import { displayTableNames } from './displayTableNames.js';
import { liClicked } from './liClicked.js';
import { searchForWord } from './searchForWord.js';

// Tables on left
const data = await window.api.sendTableNames();

async function work() {
    if(!data.isDefault) {
        await displayTableNames(data);
        await liClicked();
        searchForWord();
    }
}
await work();