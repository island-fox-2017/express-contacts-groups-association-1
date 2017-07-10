var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/data.db');

//CRUD function
let insertContacts = (json) => {
//  console.log(db);
  let insertContacts = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${json.name}', '${json.company}', '${json.telp_number}', '${json.email}');`;

  db.run(insertContacts);
};

let insertGroups = (json) => {
//  console.log(db);
  let insertGroups = `INSERT INTO Groups (name_of_group) VALUES ('${json.name_of_group}');`;

  db.run(insertGroups);
};

let insertProfiles = (json) => {
  let insertProfiles = `INSERT INTO Profiles (username, password, contact_id) VALUES ('${json.username}', '${json.password}', ${json.contact_id});`;

  db.run(insertProfiles);
};

let insertAddresses = (json) => {
  let insertAddresses = `INSERT INTO Addresses (street, city, zip_code, contact_id) VALUES ('${json.street}', '${json.city}', ${json.zip_code},${json.contact_id});`;

  db.run(insertProfiles);
};

let editContacts = (json) => {
  let editContacts = `UPDATE Contacts SET name = '${json.name}', company = '${json.company}', telp_number = '${json.telp_number}', email = '${json.email}' WHERE id = '${json.id}';`;

  db.run(editContacts);
};

let editGroups = (json) => {
  let editGroups = `UPDATE Groups SET name_of_group = '${json.name_of_group}';`;

  db.run(editGroups);
};

let editProfiles = (json) => {
  let editProfiles = `UPDATE Profiles SET username = '${json.username}', password = '${json.password}', contact_id = ${json.contact_id} WHERE id = '${json.id}';`;

  db.run(editProfiles);
};

let removeContacts = (id) => {
    let removeContacts = `DELETE FROM Contacts WHERE id = '${id}';`;

    db.run(removeContacts);
};

let removeGroups = (id) => {
    let removeGroups = `DELETE FROM Groups WHERE id = '${id}';`;

    db.run(removeGroups);
};

let removeProfiles = (id) => {
    let removeProfiles = `DELETE FROM Profiles WHERE id = '${id}';`;

    db.run(removeProfiles);
};

 module.exports = {
     insertContacts,
     insertGroups,
     insertProfiles,
     insertAddresses,
     editContacts,
     editGroups,
     editProfiles,
     removeContacts,
     removeGroups,
     removeProfiles
 };

//insertData();
