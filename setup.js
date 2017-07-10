var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTable(){
  db.run('CREATE TABLE IF NOT EXISTS Contact(id INTEGER primary key AUTOINCREMENT , Name TEXT, Company TEXT, Telp INTEGER, Email TEXT)');
}

// module.export = {createTable, };
module.exports = createTable;
