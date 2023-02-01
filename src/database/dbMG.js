const oracledb = require("oracledb");
const loginData = {
    user : "ziibd37",
    password : "haslo2022",
    connectString : "155.158.112.45:1521/oltpstud",
}
async function getTableNames () {
    let connection;
    try {
        connection = await oracledb.getConnection(loginData)
        result = await connection.execute(`SELECT table_name FROM user_tables`);
        connection.close();
        return result.rows;
    } catch (err) {
        console.log(err)
    }
}

async function getTableRows (tableName) {
    let connection;
    try {
        connection = await oracledb.getConnection(loginData)
        let result = await connection.execute(`SELECT * FROM ${tableName}`);
        connection.close();
        return result;
    } catch (err) {
        console.log(err)
    }
}
async function getSearchResult ({searchText, tableName, tableColumn}) {
    let connection;
    try {
        connection = await oracledb.getConnection(loginData)
        let query;
        if (tableColumn.search('HIRE_DATE') == -1) {
            query = `SELECT * FROM ${tableName} WHERE ${tableColumn} LIKE '%${searchText}%'`;
        } else {
            query = `SELECT * FROM ${tableName} WHERE TO_CHAR(${tableColumn},'yyyy/mm/dd') LIKE '%${searchText}%'`
        }
        result = await connection.execute(query);
        connection.close();
        return result.rows;
    } catch (err) {
        console.log(err)
    }
}

async function getTableColumns (tableName) {
    let connection;
    try {
        connection = await oracledb.getConnection(loginData);
        let query = `SELECT * FROM ${tableName}`;
        let result = await connection.execute(query);
        connection.close();
        let finalResult = result.metaData.map(ob => ob.name);
        return finalResult;

    } catch (err) {
        console.log(err)
    }

}

exports.getTableColumns = getTableColumns;
exports.getTableNames = getTableNames;
exports.getTableRows = getTableRows;
exports.getSearchResult = getSearchResult;