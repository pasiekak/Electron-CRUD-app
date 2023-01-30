async function showFormInsert () {
    let tableName
    try { tableName = document.querySelector('.wrapperTableValues caption').innerText; } catch (err) { tableName = '' }
    if (tableName !== '') {
        const divOptionInputs = document.querySelector('#optionInputs');
        const tableColumnsHTML = document.querySelectorAll('.wrapperTableValues th');
        const form = document.createElement('form');
        tableColumnsHTML.forEach((column) => {
            const col = column.innerText.toLowerCase();

            let input = document.createElement('input');

            input.setAttribute('type','text');
            input.setAttribute('placeholder',`Podaj ${col}`);
            input.setAttribute('id',`input_${col}`);
            input.setAttribute('name',`input_${col}`);
            form.appendChild(input);
        })
        let button = document.createElement('button');
        let span = document.createElement('span');
        let text = document.createTextNode('Insert');

        span.appendChild(text);
        button.appendChild(span);

        button.setAttribute('id','btnInsert');

        divOptionInputs.appendChild(form);
        divOptionInputs.appendChild(button);

        button = document.querySelector('#optionInputs button');
    }
}
export {showFormInsert};