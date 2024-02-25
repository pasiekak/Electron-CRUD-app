import {displayTable} from "../table/displayTable.js";

async function liClicked () {
        const divTables = document.querySelectorAll('#tables div');
        divTables.forEach(div => {
            div.addEventListener('click',async () => {
                const tableName = div.innerText;
                await resetTable(tableName)
            });
        });
}

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

async function resetTable(tableName) {
    // clearing inputs for insert,delete etc.
    const result = await window.api.sendTable(tableName);
    let tableRows = result.rows;
    let tableColumns = result.columns;
    addSearchOptions(tableColumns)
    displayTable(tableName, tableColumns, tableRows);
}

export {liClicked, resetTable};