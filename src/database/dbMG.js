const oracledb = require("oracledb");
const loginData = {
    user : "ziibd37",
    password : "haslo2022",
    connectString : "155.158.112.45:1521/oltpstud",
}
async function getTableNames () {
    let connection;
    let xd;
    try {
        connection = await oracledb.getConnection(loginData);
        let result = await connection.execute(`SELECT table_name FROM user_tables`);
        xd = result.rows;
    } catch (err) {
        console.log(err, '\n\nError in getTableNames(), dbMG.js');
    } finally {
        await connection.close();
        return xd;

    }
}

async function getTableRows (tableName) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(loginData);
        result = await connection.execute(`SELECT * FROM ${tableName}`);
    } catch (err) {
        console.log(err, '\n\nError in getTableRows(), dbMG.js');
    } finally {
        if (connection) {
            await connection.close();
            return result;
        }
    }
}
async function getSearchResult ({searchText, tableName, tableColumn}) {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection(loginData)
        let query;
        if (tableColumn.search('HIRE_DATE') === -1) {
            query = `SELECT * FROM ${tableName} WHERE ${tableColumn} LIKE '%${searchText}%'`;
        } else {
            query = `SELECT * FROM ${tableName} WHERE TO_CHAR(${tableColumn},'yyyy/mm/dd') LIKE '%${searchText}%'`;
        }
        result = await connection.execute(query);
    } catch (err) {
        console.log(err, '\n\nError in getSearchResult(), dbMG.js');
    } finally {
        if (connection) {
            await connection.close();
            return result.rows;
        }
    }
}

async function getTableColumns (tableName) {
    let connection;
    let finalResult;
    try {
        connection = await oracledb.getConnection(loginData);
        let query = `SELECT * FROM ${tableName}`;
        let result = await connection.execute(query);
        finalResult = result.metaData.map(ob => ob.name);
    } catch (err) {
        console.log(err, '\n\nError in getTableColumns(), dbMG.js');
    } finally {
        if (connection) {
            await connection.close();
            return finalResult;
        }
    }
}

async function sendColumnType({tableName, tableColumn}) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(loginData)
        let sql = `SELECT column_name, data_type, data_length FROM user_tab_columns WHERE table_name = '${tableName}' AND column_name = '${tableColumn}'`;
        result = await connection.execute(sql)
    } catch (err) {
        console.log(err, '\n\nError in sendColumnType(), dbMG.js');
    } finally {
        if (connection) {
            await connection.close();
            return result.rows[0][1];
        }
    }
}

async function updateValue ({tableName, tableColumn, columnType, oldValue, newValue}) {
    oracledb.autoCommit = true;
    let connection, result;
    try {
        connection = await oracledb.getConnection(loginData);
        let sql;
        if (columnType === 'NUMBER') {
            sql = `UPDATE ${tableName} SET ${tableColumn} = ${newValue} WHERE ${tableColumn} = ${oldValue}`;
        } else if (columnType === 'VARCHAR2') {
            sql = `UPDATE ${tableName} SET ${tableColumn} = '${newValue}' WHERE ${tableColumn} LIKE '${oldValue}'`;
        } else if (columnType === 'DATE') {
            sql = `UPDATE ${tableName} SET ${tableColumn} = TO_DATE('${newValue}', 'DD-MON-RR') WHERE ${tableColumn} LIKE '${oldValue}'`
        }
        if (oldValue === 'null') {
            sql = sql.slice(0, sql.lastIndexOf(" WHERE "));
            sql += ` WHERE ${tableColumn} IS NULL`;
        }
        console.log(sql);
        result = await connection.execute(sql);
    } catch (err) {
        console.log(err, '\n\nError in updateValue(), dbMG.js');
    } finally {
        if (connection) {
            await connection.close()
            return result;
        }
    }
}

exports.sendColumnType = sendColumnType;
exports.updateValue = updateValue;
exports.getTableColumns = getTableColumns;
exports.getTableNames = getTableNames;
exports.getTableRows = getTableRows;
exports.getSearchResult = getSearchResult;