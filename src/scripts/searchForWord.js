import {liClicked} from "./liClicked.js";
import {displayTable} from "./displayTable.js";

async function searchForWord() {
    let searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click',() => {
        let tableName;
        try {
            tableName = document.querySelector('#queryResult caption').innerText
        } catch (err) { tableName = '' }
        let searchText = document.querySelector('#searchText').value;
        let searchResult = Array();
        (async () => {
            // When button is clicked Table must be selected and search text must be written
            if (tableName !== '' && searchText !== '') {
                // Without await it will return promise;
                let tableColumns = await window.api.sendTableColumns(tableName);
                tableColumns.forEach(tableColumn => {
                    (async () => {
                        let singleSearchResult = await window.api.sendSearchResult({searchText,tableName,tableColumn})
                        singleSearchResult.forEach(row => {
                            searchResult.push(row);
                            console.log('PUSH AT: ',Date.now()/1000)
                        })
                    })()
                })
                let finalResult = deleteDuplicatesThenDisplay(searchResult);
                await display(tableName, tableColumns, finalResult);
            }
        })()
    });
}
export { searchForWord };

function deleteDuplicatesThenDisplay(searchResult) {
    let finalResult;
    setTimeout(() => {
        finalResult = [...new Set(searchResult.map(JSON.stringify))].map(JSON.parse);
        },2500)
    return finalResult
}
async function display(tableName,tableColumns,finalResult) {
    setTimeout(function () {
        displayTable({tableName, tableColumns, finalResult})
    },2750)
}