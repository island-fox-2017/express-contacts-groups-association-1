var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contacts.db');

function createTable () {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            company TEXT, 
            telp_number TEXT, 
            email TEXT)` 
          ); 
  console.log('TABLE contacts SUCCESFULLY CREATED');
  
  db.run(`CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name_of_group TEXT)`
          );
  console.log('TABLE groups SUCCESFULLY CREATED');
  
  db.run(`CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text,
            facebook_username text,
            google_username text,
            contacts_id INTEGER )`
          );
  console.log('TABLE profiles SUCCESFULLY CREATED');
  
  db.run(`CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            street text,
            city text,            
            zipcode INTEGER,
            contacts_id INTEGER)`
          );
  console.log('TABLE addresses SUCCESFULLY CREATED');
  
  db.run(`CREATE TABLE IF NOT EXISTS contacts_groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contacts_id INTEGER,
            groups_id INTEGER)`
          );          
}

createTable()