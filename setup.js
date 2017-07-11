let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

function createContactsTable() {
  db.run(`
    CREATE TABLE Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      company VARCHAR(255),
      telp_number VARCHAR(255),
      email VARCHAR(255)
    );
  `);
  console.log("kontak");
}

function createGroupsTable() {
  db.run(`
    CREATE TABLE Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_group VARCHAR(255)
    );
  `);
  console.log("grup");
}

function createProfileTable() {
  db.run(`
    CREATE TABLE Profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255),
      password VARCHAR(255),
      contact_id INTEGER
    );
  `);
  console.log('propil');
}

function createAddressTable() {
  db.run(`
    CREATE TABLE Address (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      street VARCHAR(255),
      city VARCHAR(255),
      zip_code VARCHAR(255),
      contact_id INTEGER
    );
  `);
  console.log('aduressuuu');
}

function createContactGroupTable() {
  db.run(`
    CREATE TABLE Contacts_Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      group_id INTEGER
    );
  `);
}

function alterContactsTable() {
  db.run(`
    ALTER TABLE Contacts
    ADD group_joined VARCHAR(255)
    `);
}

//createContactsTable();
//createGroupsTable();
//createProfileTable();
//createAddressTable();
//createContactGroupTable();
//alterContactsTable();
