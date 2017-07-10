
var express = require('express')
var path = require('path');
var app = express()
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('data.db');



// (( DROPDOWN masuk disini jg jdne))
// GET    | /addresses            | data addresses
app.get('/addresses', function(req,res) {
  db.all('SELECT * FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId', function(err, rows) {
    if(!err) {
      db.all('SELECT id, first_name FROM Contacts', function (err,rowsDropdown){
        res.render('address', {panggilData: rows,
        panggilDataDropdown: rowsDropdown})
      })
    }
  })
})


// POST   | /addresses            | input address
app.post('/addresses', function(req, res){
  db.run(`INSERT INTO Addresses(street, city, zip_code, ContactId)
  VALUES('${req.body.street}', '${req.body.city}', '${req.body.zip_code}', '${req.body.ContactId}')
  `)
  res.redirect('/addresses')
})

// GET    | /addresses/edit/:id   | Menampilkan data address spesifik untuk diubah
// POST   | /addresses/edit/:id   | Menerima data form untuk update address
app.get('/addresses/edit/:id', function(req, res){
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}'`, function(err,rows){
    if(!err) {
      res.render('editaddress', {panggilData: rows});
    }
  })
})

app.post('/addresses/edit/:id', function(req,res){
  db.run(`UPDATE Addresses SET
      street = '${req.body.street}',
      city = '${req.body.city}',
      zip_code = '${req.body.zip_code}',
      WHERE id = '${req.params.id}';`)
        res.redirect('/addresses');
})

// GET    | /addresses/delete/:id | Menghapus data address berdasarkan id
app.get('/addresses/delete/:id', function(req,res){
  db.run(`DELETE FROM Addresses WHERE id ='${req.params.id}'`)
    res.redirect('/addresses');
})

// mau nampilin  /addresses/:id ( utk nampilin aja si address e )
app.get('/contacts/addresses/:id', function(req, res){
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}'`, function(err,rows){
    if(!err) {
      res.render('addressaja', {panggilData: rows});
    }
  })
})


//---------------------
// NOW buat PROFILE
// satu lagi utk nampilin show details profile
app.get('/profiles/show_details/:id', function(req,res) {
  db.all('SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId', function(err, rows) {
    if(!err) {
      res.render('profilekecontact', {panggilData: rows})
    }
  })
})


// GET    | /Profiles            | data profiles
app.get('/profiles', function(req,res) {
  db.all('SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId', function(err, rows) {
// SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId
    if(!err) {
      res.render('profile', {panggilData: rows})
    }
  })
})

// POST   | /profiles            | input profile
app.post('/profiles', function(req, res){
  db.run(`INSERT INTO Profiles(username, password, ContactId)
  VALUES('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')
  `)
  res.redirect('/profiles')
})

// GET    | /profiles/edit/:id   | Menampilkan data profile spesifik untuk diubah
// POST   | /profiles/edit/:id   | Menerima data form untuk update profile
app.get('/profiles/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}'`, function(err,rows){
    if(!err) {
      res.render('editprofile', {panggilData: rows});
    }
  })
})

app.post('/profiles/edit/:id', function(req,res){
db.run(`UPDATE Profiles SET
username = '${req.body.username}',
password = '${req.body.password}' WHERE id = '${req.params.id}';`)
res.redirect('/profiles');
})

// GET    | /profiles/delete/:id | Menghapus data profile berdasarkan id
app.get('/profiles/delete/:id', function(req,res){
db.run(`DELETE FROM Profiles WHERE id ='${req.params.id}'`)
res.redirect('/profiles');
})

//---------------------
// localhost:3000/
app.get('/', function(req, res){
  res.render("welcome")
})


// GET    | /contacts            | data contacts
// (versi awal)
// app.get('/contacts', function(req,res) {
//   db.all('Select * from Contacts', function(err, rows) {
//     if(!err) {
//       res.render('contacts', {panggilData: rows})
//     }
//   })
// })

// (versi updated - many to many with groups)
// app.get('/contacts', function(req,res) {
//   db.all('SELECT * FROM Contacts_Groups AS cg JOIN Contacts AS co ON cg.ContactId = co.id JOIN Groups AS gr ON cg.GroupsId = gr.id', function(err, rows) {
//     if(!err) {
//       res.render('contacts', {panggilData: rows})
//     }
//   })
// })

// versi updated + akses address
app.get('/contacts', function(req,res) {
  db.all('SELECT * FROM Contacts_Groups AS cg JOIN Contacts AS co ON cg.ContactId = co.id JOIN Groups AS gr ON cg.GroupsId = gr.id', function(err, rows) {
    if(!err) {
      db.all('SELECT * FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId', function(err, rowsAddress) {
        if(!err) {
          res.render('contacts', {
            panggilData: rows,
            panggilDataAddress: rowsAddress
          })
        }
      })
    }
  })
})



// POST   | /contacts            | input contact
app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts(first_name, last_name)
  VALUES('${req.body.first_name}', '${req.body.last_name}')
  `)
  res.redirect('/contacts')
})

// GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
// POST   | /contacts/edit/:id   | Menerima data form untuk update contact
app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, function(err,rows){
    if(!err) {
      res.render('editcontact', {panggilData: rows});
    }
  })
})

app.post('/contacts/edit/:id', function(req,res){
db.run(`UPDATE Contacts SET
first_name = '${req.body.first_name}',
last_name = '${req.body.last_name}' WHERE id = '${req.params.id}';`)
res.redirect('/contacts');
})

// GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
app.get('/contacts/delete/:id', function(req,res){
db.run(`DELETE FROM Contacts_Groups WHERE id ='${req.params.id}'`)
res.redirect('/contacts');
})

// GROUPS =
// (( UPDATE LECTURE SIANG 10 juli -many to many ))
// GET    | /groups            |semua data groups + now combine dgn contacts ( many to many)
app.get('/groups', function(req,res) {
  db.all('SELECT * FROM Contacts_Groups AS cg JOIN Contacts AS co ON cg.ContactId = co.id JOIN Groups AS gr ON cg.GroupsId = gr.id', function(err, rows) {
    if(!err) {
      res.render('groups', {panggilData: rows})
    }
  })
})

//--- mgk butuh data dummy utk table Groups_contacts - OK DONE..
// app.get('/insertdata', function(res,res){
// db.run(`INSERT INTO Contacts_Groups (ContactId, GroupsId) VALUES (1, 1), (1,2), (2, 1), (2,2), (1,3);`)
// res.render ('insert')
// })
//--------

// POST   | /groups            | input group
app.post('/groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group)
  VALUES('${req.body.name_of_group}')
  `)
  res.redirect('/groups')
})

// GET    | /groups/edit/:id   | Menampilkan data group spesifik untuk diubah
// POST   | /groups/edit/:id   | Menerima data form untuk update group
app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}';`, function(err,rows){
    if(!err) {
      res.render('editgroup', {panggilData: rows});
    }
  })
})

app.post('/groups/edit/:id', function(req,res){
db.run(`UPDATE Groups SET
name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}';`)
res.redirect('/groups');
})

// GET    | /groups/delete/:id | Menghapus data group berdasarkan id
app.get('/groups/delete/:id', function(req,res){
db.run(`DELETE FROM Contacts_Groups WHERE id ='${req.params.id}'`)
res.redirect('/groups');
})

app.listen(3000)
