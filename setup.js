var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('data.db');

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts
           (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name text, last_name text);`);
  console.log("Table Contacts created..");
  db.run(`CREATE TABLE IF NOT EXISTS Groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text unique);`);
  console.log("Table Groups created..");
  db.run(`CREATE TABLE IF NOT EXISTS Addresses
           (id INTEGER PRIMARY KEY AUTOINCREMENT, street text, city text, zip_code INTEGER, ContactId INTEGER);`);
  console.log("Table Address created..");
  db.run(`CREATE TABLE IF NOT EXISTS Profiles
           (id INTEGER PRIMARY KEY AUTOINCREMENT, username text unique, password text, ContactId INTEGER);`);
  console.log("Table Profiles created..");
  db.run(`CREATE TABLE IF NOT EXISTS Contacts_Groups
            (id INTEGER PRIMARY KEY AUTOINCREMENT, ContactId INTEGER, GroupsId INTEGER)`)
  console.log("Table Contacts_Groups created..");
}

createTable();
