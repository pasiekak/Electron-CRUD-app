import { displayTableNames } from './displayTableNames.js';
import { displayTable } from './displayTable.js';
import { searchForWord } from './searchForWord.js';
import { optionEvents } from './optionEvents.js';
// Tables on left

const data = await window.api.sendTables();

async function work() {
    if(!data.isDefault) {
        await displayTableNames(data);
        await displayTable();
        await searchForWord();
        await optionEvents();
    }
}
await work();