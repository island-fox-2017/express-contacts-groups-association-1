var Sqlite3 = require('sqlite3').verbose();
var db = new Sqlite3.Database('db/data.db');

function createTableContacts() {
  db.run("CREATE TABLE if not exists contacts (id INTEGER primary key AUTOINCREMENT, first_name TEXT, last_name TEXT, company TEXT, telp_number TEXT, email TEXT);");
  console.log("Table contacts created");
}
//
function createTableGroups() {
  db.run("CREATE TABLE if not exists groups (id INTEGER primary key AUTOINCREMENT, name_group TEXT);");
  console.log("Table groups created");
}

function createTableProfile() {
  db.run("CREATE TABLE if not exists profile (id INTEGER primary key AUTOINCREMENT, username TEXT, pwd TEXT, contact_id INTEGER);");
  console.log("Table profile created");
}

function createTableAddress() {
  db.run("CREATE TABLE if not exists address (id INTEGER primary key AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER(9), contact_id INTEGER);");
  console.log("Table address created");
}

function createTableContactGroup() {
  db.run("CREATE TABLE if not exists contactgroup (id INTEGER primary key AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);");
  console.log("Table contactgroup created");
}

createTableContacts();
createTableGroups();
createTableProfile();
createTableAddress();
createTableContactGroup();
