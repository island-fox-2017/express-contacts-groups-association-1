var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTable(){
  db.run('CREATE TABLE IF NOT EXISTS Contact(id INTEGER primary key AUTOINCREMENT , Name TEXT, Company TEXT, Telp INTEGER, Email TEXT)');

  db.run('CREATE TABLE IF NOT EXISTS ContactGroup(id INTEGER primary key AUTOINCREMENT, GroupName TEXT, Contact_id INTEGER)');

  db.run('CREATE TABLE IF NOT EXISTS Profile(id INTEGER primary key AUTOINCREMENT, Username varchar(50), Password varchar(50), Contact_id INTEGER)');

  db.run('CREATE TABLE IF NOT EXISTS Address(id INTEGER primary key AUTOINCREMENT, Street varchar(250), City varchar(250), ZIPcode INTEGER, Contact_id INTEGER)');

  db.run('CREATE TABLE IF NOT EXISTS CG(id INTEGER primary key AUTOINCREMENT,  ContactID, GroupID)');
}
createTable();

// module.export = {createTable, };
module.exports = createTable;
