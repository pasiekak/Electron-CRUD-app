import {displayTable} from "./displayTable.js";

async function liClicked () {
        const divTabels = document.querySelectorAll('#tables li');
        divTabels.forEach(li => {
            li.addEventListener('click',() => {
                const tableName = li.innerText
                // clearing inputs for insert,delete etc.
                document.querySelector('#optionInputs').innerHTML = null;
                document.querySelector('#optionPick').selectedIndex = 0;
                (async () => {
                    const result = await window.api.sendTable(tableName);
                    setTimeout(function () {
                        let rows = result.rows;
                        let columns = result.metaData.map(obj => obj.name);
                        displayTable(tableName, columns, rows);
                    },50);
                })()
            });
        });
}

export {liClicked};