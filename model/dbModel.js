"use strict"

const sqlite3 = require('sqlite3').verbose();

class dbModel {
  constructor() {
    this.connection = new sqlite3.Database(`./db/data1.db`);
  }

  createTableContacts() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts
      (id INTEGER PRIMARY KEY AUTOINCREMENT, company TEXT, name TEXT,
        telp_number INTEGER, email TEXT)`)
  };

  createTableGroups() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)`)
  };

  createTableProfiles() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles
      (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT,
        facebook_username TEXT, google_username TEXT)`)
  };

  createTableAddresses() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Addresses
      (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT,
        city TEXT, zip_code INTEGER)`)
  };
}
module.exports = dbModel
// let model = new dbModel();
// model.createTableContacts();
// model.createTableGroups();
// model.createTableProfiles();
// model.createTableAddresses()
