import {displayTable} from "./displayTable.js";

async function liClicked () {
        const divTables = document.querySelectorAll('#tables li');
        divTables.forEach(li => {
            li.addEventListener('click',() => {
                console.log(li.innerText)
                const tableName = li.innerText;
                // clearing inputs for insert,delete etc.
                (async () => {
                    const result = await window.api.sendTable(tableName);
                    let tableRows = result.rows;
                    let tableColumns = result.metaData.map(obj => obj.name);
                    addSearchOptions(tableColumns)
                    displayTable(tableName, tableColumns, tableRows);
                })()
            });
        });
}

export {liClicked};

function addSearchOptions(tableColumns) {
    const selectSearchColumn = document.querySelector('#selectSearchInput');
    selectSearchColumn.innerHTML = '<option value="nothing" selected>Opcjonalny wybór kolumny</option>';
    for (let column of tableColumns) {
        let option = document.createElement('option');
        option.setAttribute('value',column);
        let optionTextNode = document.createTextNode(column);
        option.appendChild(optionTextNode);
        selectSearchColumn.appendChild(option);
    }
}