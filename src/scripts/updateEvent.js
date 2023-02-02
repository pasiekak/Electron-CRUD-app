function updateEvent(tableName, tableColumn, td, span) {
    span.addEventListener('click',() => {
        if (td.childNodes.length == 1) {
            let input = document.createElement('input');
            let button = document.createElement('button');
            let buttonText = document.createTextNode('Update');

            button.appendChild(buttonText);
            input.setAttribute('type','text');
            input.setAttribute('placeholder','Podaj nową wartość');

            td.appendChild(input);
            button.addEventListener('click',async () => {
                if(input.value !== '') {
                    let columnType = await window.api.sendColumnTypes({tableName, tableColumn})
                    let updateOb = {
                        tableName : tableName,
                        tableColumn : tableColumn,
                        columnType: columnType,
                        oldValue : span.innerText,
                        newValue : undefined,
                    }
                    if (columnType === 'VARCHAR2' || input.value === 'null' || columnType === 'DATE') {
                        updateOb.newValue = input.value;
                        console.log('var',updateOb.newValue)
                    } else if (columnType === 'NUMBER') {
                        updateOb.newValue = parseInt(input.value);
                        console.log('num',updateOb.newValue)
                    }
                    await window.api.updateValue(updateOb)
                    span.innerText = updateOb.newValue;
                    td.replaceChildren(td.childNodes[0]);
                }
            });
            td.appendChild(button);
        } else {
            td.replaceChildren(td.childNodes[0]);
        }
    });
}
export { updateEvent }
