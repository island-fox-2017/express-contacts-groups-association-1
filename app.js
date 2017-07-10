var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/create_table', function (req, res) {
    // db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number int, email text)");
    // db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text)");
    db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, password text, contact_id INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS Address (id INTEGER PRIMARY KEY AUTOINCREMENT, street text, city text, zip integer, contact_id INTEGER)");
    res.send('table Contacts, Groups, Profile, & Address created');
})

// app.get('/create_table', function (req, res) {
//     db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text)")
//     res.send('table Groups created');
// })

//
// app.get('/contacts/insert', function (req, res) {
//     db.run("INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Rahmat Hidayat', 'PT Coding Indonesia', 08122, 'hidayat@gmail.com')");
//     res.redirect('/contacts');
// })

//Contacts Setting
app.get('/contacts', function (req, res) {
  db.all(`SELECT * FROM Contacts`, function (err, data) {
    res.render('contacts', {contact_data: data})
  })
  //
})

app.post('/contacts', function (req, res) {
  db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${req.body.nama}', '${req.body.company_name}', '${req.body.telp_num}', '${req.body.email}' )`);
    res.redirect('/contacts');
})


//Contacts Edit
app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function (err, data){
    res.render('edit_contact', {contact_data: data})
  })
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name='${req.body.nama}', company='${req.body.company_name}', telp_number='${req.body.telp_num}', email='${req.body.email}' WHERE id='${req.params.id}'`)
  res.redirect('/contacts')
})

//Contacts Delete
app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/contacts')
  })
})

//Groups Setting
app.get('/groups', function (req, res) {
  db.all("SELECT * FROM Groups", function (err, data) {
    res.render('groups', {group_data: data})
  })
})

app.post('/groups', function (req, res) {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.nama_group}')`);
    res.redirect('/groups');
})



//Groups Edit
app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function (err, data){
    res.render('edit_group', {group_data: data})
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group='${req.body.nama_group}' WHERE id=${req.params.id}`)
  res.redirect('/groups')
})

//Groups Delete
app.get('/groups/delete/:id', function(req, res) {
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/groups')
  })
})

//Profile Setting
app.get('/profiles', function (req, res) {
  db.all("SELECT * FROM Profile", function (err, data) {
    // res.render('profiles', {profile_data: data})
    db.all("SELECT id, name FROM Contacts", function (err, data2) {
      res.render('profiles', {profile_data: data, contact_data: data2})
    })
  })
})

app.post('/profiles', function (req, res) {
  db.run(`INSERT INTO Profile (username, password, contact_id)
  VALUES ('${req.body.nama_user}', '${req.body.pass}', '${req.body.kontak_id}' )`);
    res.redirect('/profiles');
})

//Profile Detail
app.get('/contacts/detail-profile/:id', function (req, res) {
  db.all(`SELECT * FROM Contacts LEFT JOIN Profile ON Contacts.id = Profile.contact_id WHERE Contacts.id=${req.params.id};`, function (err, data) {
    // console.log(data);
    res.render('contact-detail', {contact_data: data})
  })
})

//Profile Edit
app.get('/profiles/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Profile WHERE id = ${req.params.id}`, function (err, data){
    // res.render('edit_profile', {profile_data: data})
    db.all("SELECT id, name FROM Contacts", function (err, data2) {
      res.render('edit_profile', {profile_data: data, contact_data: data2})
    })
  })
})

app.post('/profiles/edit/:id', function(req, res){
  db.run(`UPDATE Profile SET username='${req.body.nama_user}', password='${req.body.pass}'  WHERE id=${req.params.id}`)
  res.redirect('/profiles')
})

//Profile Delete
app.get('/profiles/delete/:id', function(req, res) {
  db.run(`DELETE FROM Profile WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/profiles')
  })
})

//Address Setting
app.get('/addresses', function (req, res) {
  db.all("SELECT * FROM Address", function (err, data) {
    // res.render('addresses', {addr_data: data})
    db.all("SELECT id, name FROM Contacts", function (err, data2) {
      res.render('addresses', {addr_data: data, contact_data: data2})
    })
  })
})

app.post('/addresses', function (req, res) {
  db.run(`INSERT INTO Address (street, city, zip, contact_id)
  VALUES ('${req.body.street}', '${req.body.city}', ${req.body.zip}, '${req.body.kontak_id}' )`);
    res.redirect('/addresses');
})

//Address Detail
app.get('/contacts/detail-address/:id', function (req, res) {
  db.all(`SELECT * FROM Contacts LEFT JOIN Address ON Contacts.id = Address.contact_id WHERE Contacts.id=${req.params.id};`, function (err, data) {
    // console.log(data);
    res.render('address-detail', {contact_data: data})
  })
})

//Address Edit
app.get('/addresses/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Address WHERE id = ${req.params.id}`, function (err, data){
    db.all("SELECT id, name FROM Contacts", function (err, data2) {
      res.render('edit_address', {addr_data: data, contact_data: data2})
    })
  })
})

app.post('/addresses/edit/:id', function(req, res){
  db.run(`UPDATE Address SET street='${req.body.street}', city='${req.body.city}', zip=${req.body.zip}  WHERE id=${req.params.id}`);
  // console.log(`UPDATE Address SET street='${req.body.street}', city='${req.body.city}', zip=${req.body.zip}  WHERE id=${req.params.id}`);
  res.redirect('/addresses')
})

//Address Delete
app.get('/addresses/delete/:id', function(req, res) {
  db.run(`DELETE FROM Address WHERE id = ${req.params.id}`, function (err, data) {
    res.redirect('/addresses')
  })
})

app.listen(3000)
