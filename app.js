'use strict'

var express = require('express')
var app = express()

var ejs = require('ejs')
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database/data.db')

// app.get('/', function(req,res) {
//   res.send('hello world!')
// })


// routing index
app.get('/', function(req, res) {
  res.render('index')
})





// routing contacts
app.get('/contacts', function(req,res) {
  db.all(`SELECT * FROM Contacts;`, function(err, data) {
    res.render('contact', {dataKontak: data})
  })
})

app.post('/contacts', function(req,res) {
  db.run(`INSERT INTO Contacts (name,company,phone_num,email) VALUES ('${req.body.formName}', '${req.body.formCompany}', '${req.body.formPhone}', '${req.body.formEmail}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function (req,res) {
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}';`, function(err, data){
    res.render('edit_contact', {dataEdit: data})
  })
})

app.post('/contacts/edit/:id', function(req,res) {
  db.run(`UPDATE Contacts SET name='${req.body.formName}', company='${req.body.formCompany}', phone_num='${req.body.formPhone}', email='${req.body.formEmail}' WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/addresses/:id', function(req,res) {
  db.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.id FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id WHERE Contacts.id = ${req.params.id};`, function(err, data) {
    res.render('show_address', {dataAddress: data})
  })
})





// routing groups
app.get('/groups', function(req,res) {
  db.all(`SELECT * FROM Groups;`, function(err, data) {
    res.render('group', {dataGrup: data})
  })
})

app.post('/groups', function(req,res) {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.formGroupName}');`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',function(req, res) {
  db.run(`DELETE FROM Groups WHERE id='${req.params.id}';`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function (req,res) {
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}';`, function(err, data){
    res.render('edit_group', {dataEdit: data})
  })
})

app.post('/groups/edit/:id', function(req,res) {
  db.run(`UPDATE Groups SET name_of_group = '${req.body.formGroupName}' WHERE id = '${req.params.id}';`)
  res.redirect('/groups')
})





// routing profiles
app.get('/profiles', function(req,res) {
  db.all(`SELECT Profiles.id AS idProfile, Profiles.username, Profiles.password, Profiles.Contacts_id, Contacts.name FROM Profiles JOIN Contacts ON Profiles.Contacts_id = Contacts.id;`, function(err,data) {
    db.all(`SELECT * from Contacts;`, function(err,data2) {
      res.render('profile', {dataProfile: data, dataKontak: data2})
    })
  })
})

app.post('/profiles', function(req,res) {
  db.run(`INSERT INTO Profiles (username, password, Contacts_id) VALUES ('${req.body.formUsername}', '${req.body.formPassword}', ${req.body.formIdContact});`)
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req,res) {
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}';`, function(err,data) {
    db.all(`SELECT * FROM Contacts;`, function(err,data2) {
      res.render('edit_profile', {dataEdit: data, dataKontak: data2})
    })
  })
})

app.post('/profiles/edit/:id', function(req,res) {
  db.run(`UPDATE Profiles SET username = '${req.body.formUsername}', password = '${req.body.formPassword}', Contacts_id = '${req.body.formIdContact}' WHERE id = '${req.params.id}';`)
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function(req, res) {
  db.run(`DELETE FROM Profiles WHERE id = '${req.params.id}';`)
  res.redirect('/profiles')
})






// routing address
app.get('/addresses', function(req,res) {
  db.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.name FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id;`, function(err,data) {
    db.all(`SELECT * FROM Contacts;`, function(err,data2) {
      res.render('address', {dataAd : data, dataKontak: data2})
    })
  })
})

app.post('/addresses', function(req,res) {
  db.run(`INSERT INTO Addresses (street, city, zip, Contacts_id) VALUES ('${req.body.formStreet}', '${req.body.formCity}', '${req.body.formZip}', ${req.body.formIdContact});`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function(req,res) {
  db.run(`DELETE FROM Addresses WHERE id = '${req.params.id}'`)
  res.redirect('/addresses')
})

app.get('/addresses/edit/:id', function(req,res) {
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}';`, function(err,data) {
    db.all(`SELECT * FROM Contacts;`, function(err,data2) {
      res.render('edit_address', {dataEdit: data, dataKontak: data2})
    })
  })
})

app.post('/addresses/edit/:id', function(req,res) {
  db.run(`UPDATE Addresses SET street = '${req.body.formStreet}', city = '${req.body.formCity}', zip = '${req.body.formZip}', Contacts_id = ${req.body.formIdContact} WHERE id = ${req.params.id};`)
  res.redirect('/addresses')
})







app.listen(3000)
