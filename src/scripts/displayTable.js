async function displayTable () {
        const divTabels = document.querySelectorAll('#tabels li');
        divTabels.forEach(li => {
            li.addEventListener('click',() => {
                const divQueryResult = document.querySelector('#queryResult');
                divQueryResult.innerHTML = null;
                const tableRows = window.api.sendTable(li.innerText);
                let table = document.createElement('table');
                tableRows.then((rowsAndColumns) => {
                    let columns = rowsAndColumns.metaData;
                    let rows = rowsAndColumns.rows;
                    let tr = document.createElement('tr');
                    columns.forEach(val => {
                        let th = document.createElement('th');
                        let thVal = document.createTextNode(val.name);
                        th.appendChild(thVal)
                        tr.appendChild(th)
                        table.appendChild(tr)
                    });
                    rows.forEach(row => {
                        tr = document.createElement('tr');
                        row.forEach(val => {
                            let td = document.createElement('td');
                            let tdVal = document.createTextNode(val);
                            td.appendChild(tdVal);
                            tr.appendChild(td);
                        })
                        table.appendChild(tr);
                    });
                    divQueryResult.appendChild(table);
                })
            })
        })

}

export {displayTable};