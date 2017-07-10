'use strict'

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/data.db');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// GET
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/addresses', function(req, res) {
  let tableQuery = `
select Addresses.addressesid, Addresses.street, Addresses.city, Addresses.zip, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email from Addresses inner join Contacts on Contacts.contactsid = Addresses.addresscontact;
`;
  let dropListQuery = `SELECT Contacts.name, Contacts.contactsid FROM Contacts;`;

  db.all(tableQuery, function(err, table) {
    db.all(dropListQuery, function(err, dropList) {
      if (!err) res.render('addresses', {table: table, dropList: dropList});
      else console.log(err);
    });
  });
});

app.get('/addresses/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Addresses WHERE addressesid = ${req.params.id};`, function(err, rows) {
    if (!err) res.render('editaddresses', {data: rows});
    else console.log(err);
  })
});

app.get('/contacts', function(req, res) {
  db.all(`SELECT * FROM Contacts;`, function(err, rows) {
    if (!err) res.render('contacts', {data: rows});
    else console.log(err);
  })
});

app.get('/addresses/delete/:id', function(req, res) {
  db.run(`DELETE FROM Addresses WHERE addressesid = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Address dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Contacts WHERE contactsid = ${req.params.id};`, function(err, rows) {
    if (!err) res.render('editcontacts', {data: rows});
    else console.log(err);
  })
});

app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM Contacts WHERE contactsid = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Contacts dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});

app.get('/groups', function(req,res) {
  db.all(`SELECT * FROM Groups;`, function(err, rows) {
    if (!err) res.render('groups', {data: rows});
    else console.log(err);
  })
});

app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Groups WHERE groupsid = ${req.params.id};`, function(err, rows) {
    if (!err) res.render('editgroups', {data: rows});
    else console.log(err);
  })
});

app.get('/groups/delete/:id', function(req, res) {
  db.run(`DELETE FROM Groups WHERE groupsid = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Group dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});

app.get('/profiles', function(req, res) {
  let tableQuery = `SELECT Profiles.profilesid, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Contacts.contactsid = Profiles.profilecontact;`;
  let dropListQuery = `SELECT Contacts.name, Contacts.contactsid FROM Contacts;`;

  db.all(tableQuery, function(err, table) {
    db.all(dropListQuery, function(err, dropList) {
      if (!err) res.render('profiles', {table: table, dropList: dropList});
      else console.log(err);
    });
  });
});

app.get('/profiles/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Profiles WHERE profilesid = ${req.params.id};`, function(err, rows) {
    if (!err) res.render('editprofiles', {data: rows});
    else console.log(err);
  })
});

app.get('/profiles/delete/:id', function(req, res) {
  db.run(`DELETE FROM Profiles WHERE profilesid = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Profile dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});

// ------------------------------------------------------

// POST
app.post('/addresses', function(req, res) {
  db.run(`INSERT INTO Addresses (street, city, zip, addresscontact) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zip}', ${req.body.addresscontact});`, function(err) {
    if (!err) res.redirect('addresses');
    else console.log(err);
  })
});

app.post('/addresses/edit/:id', function(req, res) {
  db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zip = '${req.body.zip}', addresscontact = ${req.body.addresscontact} WHERE addressesid = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/addresses');
    else console.log(err);
  })
})

app.post('/contacts', function(req, res) {
  db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}');`, function(err) {
    if (!err) res.redirect('contacts');
    else console.log(err);
  })
});

app.post('/contacts/edit/:id', function(req, res) {
  db.run(`UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE contactsid = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/contacts');
    else console.log(err);
  })
})

app.post('/groups', function(req, res) {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.name_of_group}');`, function(err) {
    if (!err) res.redirect('groups');
    else console.log(err);
  })
})

app.post('/groups/edit/:id', function(req, res) {
  db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE groupsid = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/groups');
    else console.log(err);
  })
})

app.post('/profiles', function(req, res) {
  db.run(`INSERT INTO Profiles (username, password, profilecontact) VALUES ('${req.body.username}', '${req.body.password}', ${req.body.profilecontact});`, function(err) {
    if (!err) res.redirect('/profiles');
    else console.log(err);
  })
})

app.post('/profiles/edit/:id', function(req, res) {
  db.run(`UPDATE Profiles SET username = '${req.body.username}', password = '${req.body.password}', profilecontact = '${req.body.profilecontact}' WHERE profilesid = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/profiles');
    else console.log(err);
  })
})

// -----------------

app.listen(3000);
console.log('listening...');
