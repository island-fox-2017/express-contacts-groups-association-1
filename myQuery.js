const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

function insertData(objSomething) {
  db.run(`
    INSERT INTO Contacts (name, company, telp_number, email)
    VALUES ('${objSomething.name}', '${objSomething.company}', '${objSomething.telp_number}', '${objSomething.email}');
  `);
}

function showData() {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        return rows;
      }
    });
}

function deleteData(id) {
  db.run(`
    DELETE FROM Contacts WHERE id = ${id};
  `);
}

function editData(obj) {
  db.run(`
    UPDATE Contacts
    SET name = '${obj.name}', company = '${obj.company}', telp_number = '${obj.telp_number}', email = '${obj.email}'
    WHERE id = ${obj.id};
  `);
}


// Groups

function insertData2(objSomething) {
  db.run(`
    INSERT INTO Groups (name_of_group)
    VALUES ('${objSomething.name_of_group}');
  `);
}

function showData2() {
  db.all(`
    SELECT * FROM Groups;
    `, function(err, rows) {
      if(!err) {
        return rows;
      }
    });
}

function deleteData2(id) {
  db.run(`
    DELETE FROM Groups WHERE id = ${id};
    `);
}

function editData2(obj) {
  db.run(`
    UPDATE Groups
    SET name_of_group = '${obj.name_of_group}'
    WHERE id = ${obj.id};
  `);
}

function insertData3(obj) {
  db.run(`
    INSERT INTO Profiles (username, password, contact_id)
    VALUES ('${obj.username}', '${obj.password}', '${obj.contact_id}'
    );
  `);
}

function deleteData3(id) {
  db.run(`
    DELETE FROM Profiles WHERE id = ${id};
  `);
}

function editData3(obj) {
  db.run(`
    UPDATE Profiles
    SET username = '${obj.username}', password = '${obj.password}', contact_id='${obj.contact_id}'
    WHERE id = ${obj.id};
  `);
}

function insertData4(obj) {
  db.run(`
    INSERT INTO Address (street, city, zip_code, contact_id)
    VALUES ('${obj.street}', '${obj.city}', '${obj.zip_code}', '${obj.contact_id}');
    `);
}

function deleteData4(id) {
  db.run(`
    DELETE FROM Address WHERE id = ${id};
    `);
}

function editData4(obj) {
  db.run(`
    UPDATE Address
    SET street = '${obj.street}', city = '${obj.city}', zip_code = '${obj.zip_code}', contact_id = '${obj.contact_id}'
    WHERE id = ${obj.id};
    `);
}

function insertData5(obj) {
  db.run(`
    INSERT INTO Contacts_Groups (contact_id, group_id)
    VALUES ('${obj.contact_id}', '${obj.group_id}');
    `);
}

module.exports = {
  insertData,
  showData,
  deleteData,
  editData,
  insertData2,
  showData2,
  deleteData2,
  editData2,
  insertData3,
  deleteData3,
  editData3,
  insertData4,
  deleteData4,
  editData4,
  insertData5
}
