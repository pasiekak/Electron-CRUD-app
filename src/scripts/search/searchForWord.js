import {displayTable} from "../table/displayTable.js";

function searchForWord() {
    let searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click',() => {
        let tableName;
        try {
            tableName = document.querySelector('#queryResult caption').innerText;
        } catch (err) { tableName = '' }
        let searchText = document.querySelector('#searchText').value;
            // When button is clicked Table must be selected and search text must be written
            if (tableName !== '' && searchText !== '') {
               load(tableName,searchText);
            }
    });
}

export { searchForWord };

function deleteDuplicatesThenDisplay(searchResult) {
    let finalResult = [];
    for (let item of searchResult) {
        let isUnique = true;
        for (let uniqueItem of finalResult) {
            if (JSON.stringify(item) === JSON.stringify(uniqueItem)) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            finalResult.push(item);
        }
    }
    return finalResult;
}
async function loadTableColumns(tableName) {
    // Without await it will return promise;
    let tableColumns = await window.api.sendTableColumns(tableName);
    return tableColumns;
}
async function loadSearchResult(tableName, tableColumns, searchText) {
    const selectSearchColumn = document.querySelector('#selectSearchInput');
    let columnChosen = selectSearchColumn[selectSearchColumn.selectedIndex].value;
    let searchResult = Array();

    if (columnChosen !== 'nothing') tableColumns = [columnChosen];
    for (const tableColumn of tableColumns) {
        let columnSearchResult = await window.api.sendSearchResult({searchText,tableName,tableColumn});
        for (let match of columnSearchResult) {
            searchResult.push(match);
        }
    }
    return searchResult;
}
async function load(tableName, searchText) {
    const tableColumns = await loadTableColumns(tableName);
    if (tableColumns.length !== 0) {
        let searchResult = await loadSearchResult(tableName, tableColumns, searchText);
        if (searchResult.length !== 0) {
            let finalResult = deleteDuplicatesThenDisplay(searchResult);
            displayTable(tableName,tableColumns, finalResult);
        }
    }
}