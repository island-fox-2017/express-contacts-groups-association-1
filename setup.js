const sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('./db/contact_group.db');


function craeteTable(){
  
db.run(`create table if not exists Contacts (id integer primary key autoincrement, name varchar(255), company varchar(255), telp_number varchar(255), email varchar(255))`);
console.log(`tabel Contact berhasil dibuat`);

db.run(`create table if not exists Groups (id integer primary key autoincrement, name_of_group varchar(255))`);
console.log(`tabel Groups berhasil dibuat`);

db.run(`create table if not exists Profiles (id integer primary key autoincrement, username text, password text, contacts_id integer)`)

db.run(`create table if not exists Address (id integer primary key autoincrement, street text, city text, zip_code text, contacts_id integer )`)

// db.run(`alter table Contacts add profiles_id integer`);
}



craeteTable()
