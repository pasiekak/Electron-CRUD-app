async function displayTableNames (tableNames) {
    const divTable = document.querySelector('#tables');
    let rows = tableNames;
    let ul = document.createElement('ul');
    rows.forEach(row => {
        let li = document.createElement('li')
        let childText = document.createTextNode(row)
        li.appendChild(childText);
        ul.appendChild(li);
    })
    divTable.appendChild(ul);

}

export {displayTableNames};