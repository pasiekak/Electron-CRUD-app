import { displayTables } from './displayTables.js';

const data = window.api.sendTables();
displayTables(data);