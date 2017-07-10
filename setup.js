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
            password text,
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
          
}

createTable()