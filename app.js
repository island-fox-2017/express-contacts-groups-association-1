const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contact_group.db');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.render('index')
})

app.get('/contacts', function(req, res){
  db.all('SELECT * FROM Contacts', function(err, rows){
    res.render('contacts', {data_contact : rows})
  })
})

app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES ('${req.body.saveName}', '${req.body.saveCompany}', '${req.body.savePhone}', '${req.body.saveEmail}');`);
  res.redirect('/contacts');
})

app.get('/contacts/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id=${req.params.id};`);
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id};`, function(err, rows){
    res.render('editContacts',{dataContact : rows})
  });
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name='${req.body.saveName}',
  company='${req.body.saveCompany}',
  telp_number='${req.body.savePhone}',
  email='${req.body.saveEmail}' WHERE
  id='${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/groups', function(req, res){
  db.all('SELECT * FROM Groups', function(err, datas){
    res.render('groups',{data_group : datas})
  })
})

app.post('/groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.saveNameGroup}');`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res){
  db.run(`DELETE FROM Groups WHERE id=${req.params.id};`);
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id=${req.params.id};`, function(err, datas){
    res.render('editGroups', {dataGroup : datas})
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group='${req.body.saveNameGroup}' WHERE id='${req.params.id}'`)
  res.redirect('/groups')
})




app.listen(3000)
