const express = require('express');
const app = express();

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contacts.db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'))

app.set('view engine', 'ejs');

// HOME
app.get('/', function(req, res) {
  res.render('index', {})
})

// CONTACTS
app.get('/contacts', function(req, res) {
  db.all("SELECT * FROM contacts", function(err, rows) {
    res.render('contacts', {data_contact: rows})
  })  
})

app.post('/contacts', function(req, res) {
  db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.nama}', '${req.body.company}', '${req.body.phone}', '${req.body.email}')`)
  res.redirect('/contacts')
})

app.post('/addContact', function(req, res) {
  res.render('contact_add')
})

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, function(err, rows) {
    res.render('contact_edit', {data_contact: rows})
  })
})

app.post('/contacts/edit/:id', function(req, res) {
  db.run(`UPDATE contacts SET name = '${req.body.nama}', company = '${req.body.company}', telp_number = '${req.body.phone}', email = '${req.body.email}' WHERE id = '${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM contacts WHERE id = '${req.params.id}'`)
  res.redirect('/contacts')
})

// GROUPS
app.get('/groups', function(req,res) {
  db.all("SELECT * FROM groups", function(err, rows) {
    res.render('groups', {data_group: rows})
  })  
})

app.post('/groups', function(req, res) {
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.nama}')`)
  res.redirect('/groups')
})

app.post('/addgroup', function(req, res) {
  res.render('group_add', {})
})

app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, function(err, rows) {
    res.render('group_edit', {data_group: rows})
  })
})

app.post('/groups/edit/:id', function(req, res) {
  db.run(`UPDATE groups SET name_of_group = '${req.body.nama}' WHERE id = '${req.params.id}'`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res) {
  db.run(`DELETE FROM groups WHERE id = '${req.params.id}'`)
  res.redirect('/groups')
})

// ADDRESSES
app.get('/addresses', function(req, res) {
  db.all("SELECT * FROM addresses", function(err, rows) {
    res.render('addresses', {data_address : rows})
  })
})

app.post('/addresses', function(req, res) {
  db.run(`INSERT INTO addresses (street, city, zipcode, contacts_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.contacts_id}' )`)
  res.redirect('/addresses')
})

app.post('/addAddress', function(req,res) {
  res.render('address_add')
})

app.get('/addresses/edit/:id', function(req, res) {
  db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err, rows) {
    res.render('address_edit', {data_address : rows})
  })
})

app.post('/addresses/edit/:id', function(req, res) {
  db.run(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', contacts_id = '${req.body.contacts_id}' WHERE id = '${req.params.id}'`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function(req, res) {
  db.run(`DELETE FROM addresses WHERE id = '${req.params.id}'`)
  res.redirect('/addresses')
})

app.listen(3000)
/**
/** EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact&Group, menambah data Contact&Group,
melakukan edit data dan delete data berdasarkan data yang dipilih

- Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: id type integer, name type string, company type string, telp_number type string, email type string
* Groups: id type integer, name_of_group type string

- Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs
----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /contacts            | Menampilkan semua data contacts
POST   | /contacts            | Menerima data form untuk input contact
GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
POST   | /contacts/edit/:id   | Menerima data form untuk update contact
GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
GET    | /groups              | Menampilkan semua data groups
POST   | /groups              | Menerima data form untuk input group
GET    | /groups/edit/:id     | Menampilkan data group spesifik untuk diubah
POST   | /groups/edit/:id     | Menerima data form untuk update group
GET    | /groups/delete/:id   | Menghapus data group berdasarkan id

- Release 2
  AKAN DIBERITAHUKAN SETELAH LECTURE SIANG
**/