async function displayTableNames (tablesPromise) {
    const divTable = document.querySelector('#tabels');
    let rows = tablesPromise.rows;
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