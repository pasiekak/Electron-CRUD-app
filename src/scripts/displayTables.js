function displayTables (tablesPromise) {
    const divTable = document.querySelector('#tabels');
    tablesPromise.then(data => {
        let rows = data.rows;
        let ul = document.createElement('ul');
        rows.forEach(row => {
            let li = document.createElement('li')
            let childText = document.createTextNode(row)
            li.appendChild(childText);
            ul.appendChild(li);
        })
        divTable.innerHTML = '';
        divTable.appendChild(ul);
    })
}

export {displayTables};