const sqlite3 = require('sqlite3').verbose();

class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }

  createTableTest() {
    this.connection.run(`
      CREATE TABLE IF NOT EXISTS TEST (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)
    `);
  }

  createContactsTable() {
    this.connection.run(`
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

  createGroupsTable() {
    this.connection.run(`
      CREATE TABLE Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_group VARCHAR(255)
      );
    `);
    console.log("grup");
  }

  createProfileTable() {
    this.connection.run(`
      CREATE TABLE Profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255),
        password VARCHAR(255),
        contact_id INTEGER
      );
    `);
    console.log('propil');
  }

  createAddressTable() {
    this.connection.run(`
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

  createContactGroupTable() {
    this.connection.run(`
      CREATE TABLE Contacts_Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id INTEGER,
        group_id INTEGER
      );
    `);
  }

  alterContactsTable() {
    this.connection.run(`
      ALTER TABLE Contacts
      DROP group_joined
    `);
  }

}

module.exports = DbModel
