var sqlite3 = require ('sqlite3').verbose();
var db = new sqlite3.Database('./db/data1.db');

function buatTabel() {

  db.run(`CREATE TABLE IF NOT EXISTS Contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
      company TEXT, telp_number TEXT, email TEXT);`)

  db.run(`CREATE TABLE IF NOT EXISTS Groups
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`)

  // db.run(`CREATE TABLE IF NOT EXISTS Profiles
  //   (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, facebook_username TEXT,
  //   google_username TEXT, contact_id INTEGER);`)

  db.run(`CREATE TABLE IF NOT EXISTS Addresses
    (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER,
      contact_id INTEGER);`)

    console.log("Buat tabel nih!!");
}

// function insertData() {
//
//   db.run(`INSERT INTO Contacts(name, company, telp_number, email)
//   VALUES ('uhuy','inigrup','08569781907','sayyaf@uhuy.com');`)
//
//   db.run(`INSERT INTO Groups(name_of_group)
//   VALUES ('kalengabret Group');`)
//
//   console.log("Buat InsertDATA nih!!!");
// }



// deleteData()
buatTabel()
// insertData()
