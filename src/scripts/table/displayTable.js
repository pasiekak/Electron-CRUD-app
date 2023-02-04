import {updateEvent} from "../update/updateEvent.js";
import {addInsertInputs} from "../insert/addInsertInputs.js";
import {addDeleteButtons} from "../delete/addDeleteButtons.js";

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
    tableRows.forEach(row => {
        tableArray.push(row)
        for (let i = 0; i < row.length; i++) {
            if (row[i] instanceof Date) {
                row[i] = `${row[i].getDate()}.${row[i].getMonth()+1}.${row[i].getFullYear()}`;
            }
        }
    });
    return tableArray;
}
function makeTableFromArray(tableArray, tableName) {
    let table = document.createElement('table');
    let caption = document.createElement('caption');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let numberOfColumns = tableArray[0].length;
    let trhead = document.createElement('tr');
    for (let i = 0; i < numberOfColumns; i++) {
        let tableColumn = tableArray[0][i];
        let th = document.createElement('th');
        let thText = document.createTextNode(tableColumn)
        th.appendChild(thText);
        trhead.appendChild(th);
    }
    thead.appendChild(trhead);
    for (let i = 1; i < tableArray.length; i++) {
        let trbody = document.createElement('tr');
        for (let j = 0; j < numberOfColumns; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span')
            let value = tableArray[i][j];
            let tdText = document.createTextNode(value);
            span.appendChild(tdText)
            td.appendChild(span)
            trbody.appendChild(td);
        }
        tbody.appendChild(trbody)
    }
    caption.innerText = tableName;
    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    table = addDeleteButtons(table);
    table = addInsertInputs(table);
    updateEvent(table)
    return table;
}