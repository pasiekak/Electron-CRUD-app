const oracledb = require('oracledb')
let connection = oracledb.getConnection({
    user : "ziibd37",
    password : "haslo2022",
    connectString : "155.158.112.45:1521/oltpstud"
});
const tables = connection.execute('SELECT table_name FROM user_tables');
console.log(tables);
exports.tables = tables;
