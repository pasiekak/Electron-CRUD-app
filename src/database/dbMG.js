const oracledb = require("oracledb");

async function getTableNames () {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user : "ziibd37",
            password : "haslo2022",
            connectString : "155.158.112.45:1521/oltpstud"})
        result = await connection.execute(`SELECT table_name FROM user_tables`);
        connection.close();
        return result;
    } catch (err) {
        console.log(err)
    }
}

async function getTableRows (tableName) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user : "ziibd37",
            password : "haslo2022",
            connectString : "155.158.112.45:1521/oltpstud"})
        result = await connection.execute(`SELECT * FROM ${tableName}`);
        connection.close();
        return result;
    } catch (err) {
        console.log(err)
    }
}
exports.getTableNames = getTableNames;
exports.getTableRows = getTableRows;