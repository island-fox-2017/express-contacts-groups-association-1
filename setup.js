var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/data.db');


let createTable = () => {
  let tableContacts = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(140), company VARCHAR(255), telp_number VARCHAR(20), email VARCHAR(140));`;

  let tableGroups = `CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(140));`;

  let tableProfiles = `CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER);`;

  let tableAddresses = `CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER, contact_id INTEGER);`;

  db.run(tableContacts);
  db.run(tableGroups);
  db.run(tableProfiles);
  db.run(tableAddresses);
};

 createTable();
