import { setAppropriateInputType } from "../update/updateEvent.js";
import { resetTable } from "../table names/liClicked.js";

function addInsertInputs(table) {
  let rowOfInputs = document.createElement("tr");
  let columns = table.querySelectorAll("th");
  let tableName = table.querySelector("caption").innerText;
  let tbody = table.querySelector("tbody");
  for (let i = 0; i < columns.length; i++) {
    let td = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("placeholder", `Podaj ${columns[i].innerText}`);
    input.setAttribute("name", columns[i].innerText);
    td.appendChild(input);
    rowOfInputs.appendChild(td);
  }
  let button = document.createElement("button");
  button.innerText = "Dodaj wiersz";

  rowOfInputs.setAttribute("class", "wrapperInsertRow");
  rowOfInputs.lastChild.appendChild(button);
  let inputs = rowOfInputs.querySelectorAll("input");
  tbody.appendChild(rowOfInputs);
  changeInputTypes(tableName, columns, inputs);
  setRequiredForNotNullableInputs(tableName, inputs);

  button.addEventListener("click", async () => {
    let insert = true;
    let newRow = {};
    inputs.forEach((input) => {
      if (input.value === "" && input.hasAttribute("required")) {
        insert = false;
      }
    });
    if(columns.length === inputs.length) {
        for (let i = 0; i < columns.length; i++) {
            newRow[columns[i].innerText] = inputs[i].value;
        }
    }
    let insertData = {
      tableName: tableName,
      newRow,
    };
    if (insert) {
      let result = await window.api.insertValues(insertData);
      if (result) {
        console.log("success");
        await resetTable(tableName);
      }
    }
  });

  return table;
}

async function changeInputTypes(tableName, tableColumns, inputs) {
  for (let i = 0; i < tableColumns.length; i++) {
    let column = tableColumns[i].innerText;
    let input = inputs[i];
    let type = await window.api.sendColumnType({ tableName, columnName: column });
    setAppropriateInputType(input, type);
  }
}

async function setRequiredForNotNullableInputs(tableName, inputs) {
  let nullableColumns = await window.api.sendNullableColumns(tableName);
  inputs.forEach((input) => {
    if (!nullableColumns.includes(input.name)) {
      let required = document.createAttribute("required");
      input.setAttributeNode(required);
    }
  });
}

export { addInsertInputs };
