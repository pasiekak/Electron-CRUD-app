const oracledb = require("oracledb");

async function getTableNames () {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user : "ziibd37",
            password : "haslo2022",
            connectString : "155.158.112.45:1521/oltpstud"})
        result = await connection.execute(`SELECT table_name FROM user_tables`);
        return result;
    } catch (err) {
        console.log(err)
    }
}
exports.getTableNames = getTableNames;