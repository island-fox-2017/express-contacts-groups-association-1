'use strict'

const sqlite = require('sqlite3');
const db = new sqlite.Database('./data/data.db');

function createTableContacts() {
  db.run('CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, number_telp INTEGER, email TEXT)');
  console.log('Table Contacts Created');
}

function createTableGroups() {
  db.run('CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_groups TEXT)');
  console.log('Table Groups Created');
}

function createTableProfil() {
  db.run('CREATE TABLE IF NOT EXISTS Profil(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, id_contacts INTEGER)');
  console.log('Table Profil Created');
}

createTableContacts();
createTableGroups();
createTableProfil();
