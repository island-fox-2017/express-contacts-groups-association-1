var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')


//==================CONTACTS=================//
function createTableContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Contact(id INTEGER primary key AUTOINCREMENT, name TEXT, company TEXT, telp_number INTEGER, email TEXT, address_id INTEGER);`)
}
console.log(createTableContacts());

//==================GROUPS===================//
function createTableGroups() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Groups(id INTEGER primary key AUTOINCREMENT, groups TEXT)`)
}
console.log(createTableGroups());

//==================PROFILE===================//
function createTableProfile() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Profile (id INTEGER primary key AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER)`)
}
console.log(createTableProfile());

//=================ADDRESS====================//
function createTableAddress() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Address(id INTEGER primary key AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER, contact_id INTEGER)`)
}
console.log(createTableAddress());
