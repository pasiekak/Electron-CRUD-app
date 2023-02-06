import {resetTable} from "../table names/liClicked.js";

function addDeleteButtons (table) {
    let rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index)=> {
        let firstTD = row.firstChild;
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class','delete');
        deleteButton.innerText = 'Usuń wiersz';

        deleteButton.addEventListener('click', async () => {
                let deleteData = {
                    tableName: table.querySelector('caption').innerText,
                    idColumnName: table.querySelector('thead th').innerText,
                    idColumnValue: firstTD.querySelector('span').innerText,
                }
                let result = await window.api.deleteRow(deleteData);
                console.log(result)
                if (result) {
                    await resetTable(deleteData.tableName);
            }
        })
        firstTD.insertBefore(deleteButton, firstTD.firstChild)
    })
    return table;
}
export { addDeleteButtons };