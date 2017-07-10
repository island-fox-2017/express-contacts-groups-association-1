'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/data.db');


let createContactsTable = () => {
  let contactsTable = `CREATE TABLE IF NOT EXISTS Contacts (contactsid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), company VARCHAR(20), telp_number VARCHAR(12), email VARCHAR(20));`;

  db.run(contactsTable, function(err) {
    if (!err) console.log('Contacs table created');
    else console.log('Contacts already defined');
  });
}

let createGroupsTable = () => {
  let groupsTable = `CREATE TABLE IF NOT EXISTS Groups (groupsid INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(20));`;

  db.run(groupsTable, function(err) {
    if (!err) console.log('Groups table created');
    else console.log('Groups already defined');
  });
}

let createProfilesTable = () => {
  let profilesTable = `CREATE TABLE IF NOT EXISTS Profiles (profilesid INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(10), password VARCHAR(15), profilecontact INTEGER, FOREIGN KEY (profilecontact) REFERENCES Contacs(contactsid));`;

  db.run(profilesTable, function(err) {
    if (!err) console.log('Profiles table created');
    else console.log('Profiles already defined');
  })
}

let createAddressTable = () => {
  let addressesTable = `CREATE TABLE IF NOT EXISTS Addresses (addressesid INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(15), city VARCHAR(15), zip VARCHAR(5), addresscontact INTEGER, FOREIGN KEY (addresscontact) REFERENCES Contacs(contactsid));`;

  db.run(addressesTable, function(err) {
    if (!err) console.log('Addresses table created');
    else console.log('Addresses already defined');
  })
}

createGroupsTable();
createContactsTable();
createProfilesTable();
createAddressTable();


// CREATE TABLE orders (
//     id INTEGER PRIMARY KEY,
//     customer_id INTEGER,
//     salesperson_id INTEGER,
//     FOREIGN KEY(customer_id) REFERENCES customers(id),
//     FOREIGN KEY(salesperson_id) REFERENCES salespeople(id)
// );
