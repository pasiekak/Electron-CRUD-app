
async function updateEvent(table) {
    let tableName = table.querySelector('caption').innerText;
    let columns = table.querySelectorAll('th'); // [n].innerText to get value of specific column
    let singleRows = table.querySelectorAll('tbody tr');
    for (let i = 0; i < singleRows.length-1; i++) { // Loop in rows
        let rowValues = singleRows[i].querySelectorAll('td');
        for (let j = 0; j < rowValues.length; j++) { // Loop in values of rows
            let singleValueTd = rowValues[j]; // td node
            let singleValueSpan = singleValueTd.firstChild // span node

            let input = document.createElement('input');
            let button = document.createElement('button');
            let nullButton = document.createElement('button');
            hideElements(input, button, nullButton);
            input.setAttribute('placeholder','Podaj nową wartość');
            nullButton.setAttribute('class', 'update');
            button.setAttribute('class', 'update');
            input.setAttribute('class', 'update');
            singleValueTd.appendChild(input);
            singleValueTd.appendChild(nullButton);
            singleValueTd.appendChild(button);

            let updateData = {
                tableName : tableName,
                columnName : columns[j].innerText,
                idColumnName : columns[0].innerText,
                idValue : rowValues[0].innerText,
                oldValue : singleValueSpan.innerText,
                newValue : undefined,
            }

            await singleValueSpan.addEventListener('click',async() => {
                if (singleValueTd.childNodes[2].hasAttribute('hidden')) {
                    let type = await window.api.sendColumnType({tableName, columnName : updateData.columnName})
                    setAppropriateInputType(input, type);

                    button.innerText = 'Update';
                    nullButton.innerText = 'Set null'
                    input.removeAttribute('hidden');
                    nullButton.removeAttribute('hidden');
                    button.removeAttribute('hidden');
                } else {
                    hideElements(input, nullButton, button)
                }
            })
            button.addEventListener('click', () => {
                if (input.value !== '') {
                    updateData.newValue = input.value;
                    window.api.updateValue(updateData).then(result => {
                        if (result.rowsAffected.length !== 0) {
                            singleValueSpan.innerText = updateData.newValue;
                            hideElements(input, nullButton, button)
                        }
                    });
                }
            })
            nullButton.addEventListener('click', () => {
                updateData.newValue = null;
                window.api.updateValue(updateData).then(result => {
                    if (result.rowsAffected.length !== 0) {
                        singleValueSpan.innerText = 'null';
                        hideElements(input, nullButton, button)
                    }
                });
            })
        }
    }
}

function setAppropriateInputType (input, type) {
    if (type === 'DATE') { input.setAttribute('type','date') }
    else if (type === 'VARCHAR2' || type === 'CHAR') { input.setAttribute('type', 'text') }
    else if (type === 'NUMBER') { input.setAttribute('type','number') }
}
function hideElements (input, nullButton, button) {
    input.setAttribute('hidden','hidden')
    button.setAttribute('hidden','hidden')
    nullButton.setAttribute('hidden','hidden')
}

export { updateEvent, setAppropriateInputType }
