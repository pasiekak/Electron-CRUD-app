import {setAppropriateInputType} from "../update/updateEvent.js";
import {resetTable} from "../table names/liClicked.js";

function addInsertInputs(table) {
    let rowOfInputs = document.createElement('tr');
    let columns = table.querySelectorAll('th');
    let tableName = table.querySelector('caption').innerText;
    let tbody = table.querySelector('tbody');
    for (let i = 0; i < columns.length; i++) {
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.setAttribute('placeholder',`Podaj ${columns[i].innerText}`);
        td.appendChild(input);
        rowOfInputs.appendChild(td);
    }
    let button = document.createElement('button');
    button.innerText = 'Dodaj wiersz';

    rowOfInputs.setAttribute('class','wrapperInsertRow');
    rowOfInputs.lastChild.appendChild(button);
    let inputs = rowOfInputs.querySelectorAll('input');
    tbody.appendChild(rowOfInputs);
    changeInputTypes(tableName, columns, inputs);
    setRequiredForNotNullableInputs(tableName, inputs);


    button.addEventListener('click', async () => {
        let insert = true;
        let values = Array();
        inputs.forEach(input => {
            if (input.value === '' && input.hasAttribute('required')) {
                insert = false
            }
            values.push(input.value);
        })
        let insertData = {
            tableName : tableName,
            values : values,
        }
        if (insert) {
            let result = await window.api.insertValues(insertData);
            if (result) {
                console.log('success')
                await resetTable(tableName)
            }
        }
    })

    return table;
}

async function changeInputTypes(tableName,tableColumns,inputs) {
    for (let i = 0; i < tableColumns.length; i++) {
        let column = tableColumns[i].innerText;
        let input = inputs[i];
        let type = await window.api.sendColumnType({tableName, columnName : column})
        setAppropriateInputType(input, type);
    }
}

async function setRequiredForNotNullableInputs (tableName, inputs) {
    let nullableColumns = await window.api.sendNullableColumns(tableName);
    for (let i = 0; i < inputs.length; i++) {
        if (nullableColumns[i][1] === 'N') {
            let required = document.createAttribute('required');
            inputs[i].setAttributeNode(required);
        }
    }
}

export {addInsertInputs};

