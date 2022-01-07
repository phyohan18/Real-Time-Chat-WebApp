const mysql = require("mysql2");

var db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "chat_db",
});

db.connect();


module.exports = db;