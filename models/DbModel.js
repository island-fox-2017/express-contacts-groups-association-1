const sqlite3 = require('sqlite3').verbose(); //verbose untuk perbaris

class DbModel{
  constructor(file){
    this.connection = new sqlite3.Database(file);
  }

  //start Contacts
  createTableContacts(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255), company varchar(255), telp_number varchar(12), email varchar(25) );`)
  }

  createTableGroups(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group varchar(25) )`);
  }

  createTableProfile(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT, username text, age INTEGER)`);
  }

  createTableAddress(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT, street varchar(255), city varchar(255), province varchar(255), zipcodes INTEGER, contact_id INTEGER)`);
  } 

}


let dbModel = new DbModel('./db/database.db');
module.exports = DbModel;
