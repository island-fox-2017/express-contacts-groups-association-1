'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');

var db = new sqlite.Database('./data/data.db');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('main')
})

app.get('/contacts', function(req, res) {
  db.all('SELECT * FROM Contacts', function(err, rows) {
    res.render('contacts', {data: rows})
  })
})

app.post('/contacts', function(req, res) {
  db.run(`INSERT INTO Contacts(name, company, number_telp, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.number_telp}', '${req.body.email}')`);
  console.log('Data Created');
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, function(err, rows) {
    res.render('edit', {data: rows})
  })
})

app.post('/contacts/update/:id', function(req, res) {
  db.run(`UPDATE Contacts set name = '${name}', company = '${company}', number_telp = '${number_telp}', email = '${email}', WHERE id = ${id};`);
  console.log('Data Update');
})

app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id = ${id};`)
  res.redirect('/contacts');
})

// app.get('/profil', function(req, res) {
//   db.all('SELECT * FROM Profil', function(err,  ))
// })
//
// app.post('/profil', function(req, res) {
//   db.run(`INSERT INTO Profil()`)
// })


app.listen(3003);
