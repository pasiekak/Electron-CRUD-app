function displayTable(tableName, tableColumns, tableRows) {
    const queryResult = document.querySelector('#queryResult');
    queryResult.innerHTML = null;
    let table = document.createElement('table');
    let caption = document.createElement('caption');
    let tr = document.createElement('tr');
    let tbody = document.createElement('tbody');
    let captionText = document.createTextNode(tableName);

    caption.appendChild(captionText);
    table.appendChild(caption);

    tableColumns.forEach(col => {
        let th = document.createElement('th');
        let thText = document.createTextNode(col);
        th.appendChild(thText)
        tr.appendChild(th);
    })
    table.appendChild(tr);
    tableRows.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(r => {
            let td = document.createElement('td');
            let tdText = document.createTextNode(r);
            td.appendChild(tdText)
            tr.appendChild(td)
        })
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);
    queryResult.appendChild(table);
}
export {displayTable};