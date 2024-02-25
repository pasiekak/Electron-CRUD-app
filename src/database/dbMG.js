const mysql = require("mysql2/promise");
const dbConfig = {
  host: "mysql61.mydevil.net",
  user: "m1080_ele_test",
  password: "Test1!",
  database: "m1080_electron_desktop_app",
};

async function getTableNames() {
  const connection = await mysql.createConnection(dbConfig);
  let tableNames = [];
  try {
    const [results, fields] = await connection.query(`show tables`);
    if (results) {
      tableNames = results.map((ob) => ob[`Tables_in_${dbConfig.database}`]);
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return tableNames;
}

async function getTableRows(tableName) {
  const connection = await mysql.createConnection(dbConfig);
  const result = {
    columns: [],
    rows: [],
  };
  try {
    const [results, fields] = await connection.query(`SELECT * FROM ${tableName}`);
    if (results && results.length > 0) {
      result.columns = Object.keys(results[0]);
      result.rows = results.map((ob) => Object.values(ob));
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return result;
}
async function getSearchResult({ searchText, tableName, tableColumn }) {
  const connection = await mysql.createConnection(dbConfig);
  const result = {
    columns: [],
    rows: [],
  };
  try {
    let query;
    if (tableColumn.search("HIRE_DATE") === -1) {
      query = `SELECT * FROM ${tableName} WHERE ${tableColumn} LIKE '%${searchText}%'`;
    } else {
      query = `SELECT * FROM ${tableName} WHERE TO_CHAR(${tableColumn},'yyyy/mm/dd') LIKE '%${searchText}%'`;
    }
    const [results, fields] = await connection.query(query);
    if (results && results.length > 0) {
      result.columns = Object.keys(results[0]);
      result.rows = results.map((ob) => Object.values(ob));
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return result;
}

async function getTableColumns(tableName) {
  const connection = await mysql.createConnection(dbConfig);
  let tableColumns = [];
  try {
    const [results, fields] = await connection.query(`SELECT * FROM ${tableName}`);
    if (results && results.length > 0) {
      tableColumns = Object.keys(results[0]);
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return tableColumns;
}
async function getNullableColumns(tableName) {
  const connection = await mysql.createConnection(dbConfig);
  let nullableColumns = [];
  try {
    const [results, fields] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}' AND IS_NULLABLE = 'YES'`
    );
    if (results && results.length > 0) {
      nullableColumns = results.map((ob) => ob.COLUMN_NAME);
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return nullableColumns;
}

async function getColumnType({ tableName, columnName }) {
  const connection = await mysql.createConnection(dbConfig);
  let type;
  try {
    const [results, fields] = await connection.query(
      `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '${tableName}' AND column_name = '${columnName}'`
    );
    if (results && results.length > 0) {
      type = results[0].DATA_TYPE;
    }
  } catch (err) {
    console.log(err);
  }
  connection.destroy();
  return type;
}

async function updateValue({ tableName, columnName, idColumnName, idValue, oldValue, newValue, updateType }) {
  const connection = await mysql.createConnection(dbConfig);
  let result = {
    affectedRows: 0,
  };
  try {
    let query;
    if (updateType === "text") {
      query = `UPDATE ${tableName} SET ${columnName} = '${newValue}' WHERE ${idColumnName} = ${idValue}`;
    } else if (updateType === "number") {
      query = `UPDATE ${tableName} SET ${columnName} = ${newValue} WHERE ${idColumnName} = ${idValue}`;
    }
    const [results, fields] = await connection.query(query);
    result = results;
  } catch (err) {
    console.log(err);
  }
  return result;
}

async function insertValues({ tableName, newRow }) {
  let result;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `INSERT INTO ${tableName} SET ?`;
    const [results, fields] = await connection.query(query, newRow);
    result = results;
  } catch (err) {
    console.log(err);
  }
  return result;
}

async function deleteRow({ tableName, idColumnName, idColumnValue }) {
  let result;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `DELETE FROM ${tableName} WHERE ${idColumnName} = ${idColumnValue}`;
    const [results, fields] = await connection.query(query);
    result = results;
  } catch (err) {
    console.log(err);
  }
  return result;
}

exports.deleteRow = deleteRow;
exports.getNullableColumns = getNullableColumns;
exports.getColumnType = getColumnType;
exports.getTableColumns = getTableColumns;
exports.getTableNames = getTableNames;
exports.getTableRows = getTableRows;
exports.getSearchResult = getSearchResult;
exports.updateValue = updateValue;
exports.insertValues = insertValues;
