async function displayTableNames(tableNames) {
  const divTable = document.querySelector("#tables");
  let rows = tableNames;
  rows.forEach((row) => {
    let div = document.createElement("div");
    // Table icon
    let divIMG = document.createElement("div");
    divIMG.setAttribute("class", "table-name-image");
    div.appendChild(divIMG);
    // Table name
    let span = document.createElement("span");
    span.innerText = row;
    div.appendChild(span);
    divTable.appendChild(div);
  });
}

export { displayTableNames };
