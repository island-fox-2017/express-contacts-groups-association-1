const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTable() {
  db.run('CREATE TABLE if not exists CONTACT2017 (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, phone INTEGER, email text)');
  console.log('Table Created!');
}


function insertData() {
  db.run("INSERT INTO CONTACT2017 (name, company, phone, email) VALUES ('Achim Baggins', 'Hacktiv8 Indonesia', 081803704343, 'achim_baggins@yahoo.com')");
}
createTable()
insertData()
