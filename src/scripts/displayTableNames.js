async function displayTableNames (tableNames) {
    const divTable = document.querySelector('#tables');
    let rows = tableNames;
    let ul = document.createElement('ul');
    rows.forEach(row => {
        let li = document.createElement('li')
        li.innerText = row
        ul.appendChild(li);
    })
    divTable.appendChild(ul);

}

export {displayTableNames};