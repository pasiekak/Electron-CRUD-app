import {update} from "./update.js";

function displayTable(tableName, tableColumns, tableRows) {
    const queryResult = document.querySelector('#queryResult');
    queryResult.innerHTML = null;

    let tableArray = makeTableAsArray(tableColumns, tableRows);
    let table = makeTableFromArray(tableArray, tableName)
    queryResult.appendChild(table);
}
export {displayTable};

// Function creates array of arrays, first one is filled with columns
function makeTableAsArray(tableColumns, tableRows) {
    let tableArray = Array();
    tableArray.push(tableColumns);
    tableRows.forEach(row => tableArray.push(row));
    return tableArray;
}
function makeTableFromArray(tableArray, tableName) {
    let table = document.createElement('table');
    let caption = document.createElement('caption');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let trhead = document.createElement('tr');
    for (let i = 0; i < tableArray[0].length; i++) {
        let th = document.createElement('th');
        th.innerText = tableArray[0][i];
        trhead.appendChild(th);
    }
    thead.appendChild(trhead);
    for (let i = 1; i < tableArray.length; i++) {
        let trbody = document.createElement('tr');
        for (let j = 0; j < tableArray[j].length; j++) {
            let td = document.createElement('td');
            let value = tableArray[i][j];
            td.innerText = value;
            td.addEventListener('click',() => {
                let input = document.createElement('input');
                input.setAttribute('type','text');
                input.setAttribute('class','updateTextInput');
                td.appendChild(input);
            });
            trbody.appendChild(td);
        }
        tbody.appendChild(trbody)
    }
    caption.innerText = tableName;
    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}