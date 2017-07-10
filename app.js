const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const ejs = require('ejs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')
// =================INDEX=======================================================
app.get('/',function(req,res) {
   res.render('index',{titleTask : 'Contact&Group'})
})
// ===========================CONTACS===========================================
app.get('/contacts', function(req,res){
  db.all(`SELECT * FROM Contact`, function(err, rows){
    res.render('contact',{contactsInput : rows })
  })
})
app.post('/contacts',function(req, res){
  db.run(`INSERT INTO Contact (name,company,telp_number,email)
          VALUES ('${req.body.name}','${req.body.company}','${req.body.phone}','${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',function(req ,res) {
  db.run(`DELETE FROM Contact WHERE id = ${req.params.id}`)
  res.redirect('/contacts');
})
app.get(`/contacts/edit/:id`,function (req,res) {
db.all(`SELECT *  FROM Contact WHERE rowid = ${req.params.id} `, function(err, rows){
      res.render('edit',{editInput : rows })
  })
})
app.post('/contacts/edit/:id',function (req,res) {
  db.run(`UPDATE Contact SET
    name = '${req.body.name}',
    company = '${req.body.company}',
    telp_number = '${req.body.phone}',
    email = '${req.body.email}'
    WHERE id = '${req.body.id}'`)
  res.redirect('/contacts')
})
//===================================GROUPS=====================================
app.get('/groups',function (req,res) {
  db.all(`SELECT * FROM Groups`, function(err, rows){
    res.render('groups',{groupInput : rows })
  })
})
app.post('/groups',function (req,res) {
  db.run(`INSERT INTO Groups (name_of_group)
  VALUES ('${req.body.groupName}')`)
  res.redirect("/groups")
})

app.get('/groups/delete/:id',function (req,res) {
  db.run(`DELETE FROM Groups WHERE id =${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id',function (req,res) {
  db.all(`SELECT * FROM Groups WHERE rowid = ${req.params.id} `, function(err, rows){
    res.render('editGroups',{editGroups: rows })
  })
})
app.post('/groups/edit/:id',function (req,res) {
  db.run(`UPDATE  Groups SET name_of_group = '${req.body.name}'  WHERE id = '${req.body.id}'`)
  res.redirect('/groups')
})
// ===================================PROFILE===================================
app.get('/profile',function(req,res) {
  db.all(`SELECT Profile.id, Profile.username , Profile.password, Profile.contact_id, Contact.name
          FROM  Profile  LEFT JOIN  Contact
          ON Profile.contact_id = Contact.id`,function(err,hasil){
            db.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`,function(err,hasil1){
              res.render('profile',{contactName : hasil1, profileInput : hasil})
            })
  })

})
app.post('/profile',function(req,res) {
  db.run(`INSERT INTO Profile (username, password ,contact_id)
  VALUES ('${req.body.username}','${req.body.password}','${req.body.contactsList}');`)
  res.redirect('/profile')
})

app.get('/profile/edit/:id',function(req,res) {
  db.all(`SELECT * FROM Profile WHERE rowid = ${req.params.id}`,function (err,rows) {
    db.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`,function(err,hasil1){
      res.render('editProfile',{contactName : hasil1, editProfile : rows})
    })
  })

})
app.post('/profile/edit/:id',function (req,res) {
  db.run(`UPDATE profile
          SET username = '${req.body.username}',
          password = '${req.body.password}', contact_id = '${req.body.contact_id}'
          WHERE id = '${req.body.id}'`)
  res.redirect('/profile')
})
app.get('/profile/delete/:id',function (req,res) {
  db.run(`DELETE FROM Profile WHERE id =${req.params.id}`)
  res.redirect('/profile')
})
// ===================================ADDRESS===================================
app.get('/address',function (req,res) {
  db.all(`SELECT Addresses.id, Addresses.street, Addresses.city,Addresses.zipCode ,Addresses.contact_id , Contact.name
          FROM Addresses LEFT JOIN Contact ON Addresses.contact_id = Contact.id
          ;`,function(err,hasilJoin){
            db.all(`SELECT Contact.id , Contact.name
                    FROM Contact`,function(err,hasilKontak){
                      res.render('address',{contactName : hasilKontak, addressData : hasilJoin })
                        console.log(hasilJoin);
                    })
          })
})
app.post('/address',function(req,res){
  db.run(`INSERT INTO Addresses (street, city, zipCode , contact_id)
          VALUES ('${req.body.street}','${req.body.city}','${req.body.postalCode}','${req.body.addressList}');`)
  res.redirect('/address')
})
app.get('/address/edit/:id',function(req,res){
  db.all(`SELECT * FROM Addresses
    WHERE rowid =${req.params.id}`
    ,function(err,hasilQuery){
      db.all(`SELECT distinct Contact.name , Contact.id FROM  Contact `,
      function(err,hasilKontak){
          res.render('editAddress',{contactName : hasilKontak, editAddress: hasilQuery})
          console.log(hasilQuery);
      })
    })
})
app.post('/address/edit/:id',function (req,res) {
  db.run(`UPDATE Addresses
          SET city = '${req.body.city}',
          zipCode = '${req.body.postalCode}', contact_id = '${req.body.contact_id}'
          WHERE id = '${req.body.id}'`)
  res.redirect('/address');
})
app.get('/address/delete/:id',function(req,res){
  db.run(`DELETE FROM Addresses WHERE id =${req.params.id}`)
  res.redirect('/address')
})
app.listen(3000)
