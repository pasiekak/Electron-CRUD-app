async function searchForWord() {
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click',function () {
        const divQueryTableBody = document.querySelector('#queryResult tbody');
        const searchText = document.querySelector('#searchText').value;
        let tableName
        try { tableName = document.querySelector('.wrapperTableValues caption').innerText; } catch (err) { tableName = '' }
        const tableColumnsHTML = document.querySelectorAll('.wrapperTableValues th');
        let searchResult = Array();
        if (tableName !== '' && searchText !== '') {
            tableColumnsHTML.forEach(column => {
                let tableColumn = column.innerText;
                searchResult.push(window.api.sendSearchResult({searchText, tableName, tableColumn}));
            });
            divQueryTableBody.innerHTML = null;
            let newTableBody = document.createElement('tbody');
            searchResult.forEach(promise => {
                promise.then(rowsAndColumns => {
                    let rows = rowsAndColumns.rows;
                    if(rows.length !== 0) {
                        rows.forEach(row => {
                            let tr = document.createElement('tr');
                            row.forEach(val => {
                                let td = document.createElement('td');
                                let tdVal = document.createTextNode(val);
                                td.appendChild(tdVal);
                                tr.appendChild(td);
                                newTableBody.appendChild(tr);
                            })
                        })
                        console.log(newTableBody)
                        divQueryTableBody.replaceWith(newTableBody);
                    }
                })
            })
        }
    })
}
export { searchForWord };