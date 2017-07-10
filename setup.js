var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTableContact() {
  db.run(`CREATE TABLE IF NOT EXISTS Contact
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) , company VARCHAR(255), telp_number VARCHAR(255)  , email VARCHAR(255)) ;`);
  console.log("Table Contact created");
}
function createTableGroup(){
  db.run(`CREATE TABLE IF NOT EXISTS Groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255));`);
  console.log('Table Group Created');

}
function createTableProfile() {
  db.run(`CREATE TABLE IF NOT EXISTS Profile
          (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255),
          password VARCHAR(255),contact_id VARCHAR(255))`)
  console.log('Table Profile Created');
}
function createTableAddress() {
  db.run(`CREATE TABLE IF NOT EXISTS Addresses
          (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(255),
          city VARCHAR(255), zipCode VARCHAR(255),contact_id VARCHAR(255)) ;`)
  console.log('Table Address Created');
}
createTableAddress()
// createTableContact()
// createTableGroup()
//createTableProfile()
