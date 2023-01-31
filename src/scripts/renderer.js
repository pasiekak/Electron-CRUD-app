import { displayTableNames } from './displayTableNames.js';
import { liClicked } from './liClicked.js';
import { searchForWord } from './searchForWord.js';
import { optionEvents } from './optionEvents.js';

// Tables on left
const data = await window.api.sendTableNames();

async function work() {
    if(!data.isDefault) {
        await displayTableNames(data);
        await liClicked();
        await searchForWord();
        await optionEvents();
    }
}
await work();