import {updateEvent} from "./updateEvent.js";

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
        let tableColumn = tableArray[0][i];
        let th = document.createElement('th');
        let thText = document.createTextNode(tableColumn)
        th.appendChild(thText);
        trhead.appendChild(th);
    }
    thead.appendChild(trhead);
    for (let i = 1; i < tableArray.length; i++) {
        let trbody = document.createElement('tr');
        for (let j = 0; j < tableArray[0].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span')
            let value = tableArray[i][j];
            let tdText = document.createTextNode(value);
            let tableColumn = tableArray[0][j];
            span.appendChild(tdText)
            td.appendChild(span)
            updateEvent(tableName, tableColumn, td, span);
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