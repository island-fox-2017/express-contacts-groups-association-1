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
  db.get(`SELECT * FROM Contacts WHERE id=${req.params.id};`, function(err, data){
    res.render('editContacts',{dataContact: data})
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
  db.get(`SELECT * FROM Groups WHERE id=${req.params.id};`, function(err, datas){
    res.render('editGroups', {dataGroup : datas})
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group='${req.body.saveNameGroup}' WHERE id='${req.params.id}'`)
  res.redirect('/groups')
})

app.get('/profiles', function(req, res){
  db.all('SELECT Profiles.id, Profiles.username, Profiles.password, Profiles.Contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles JOIN Contacts ON Profiles.Contact_id = Contacts.id;', function(err, rows){
    if(!err){
      db.all('SELECT * FROM Contacts;', function(err, data){
        if(!err){
          res.render('profiles', {data_profile : rows, data_contact : data})
        }
      })
    }
  })
})

app.post('/profiles', function(req, res){
  db.run(`INSERT INTO Profiles(username, password, Contact_id) VALUES ('${req.body.saveUsername}', '${req.body.savePassword}', '${req.body.saveContactID}');`)
  res.redirect('/profiles');
})

app.get('/profiles/delete/:id', function(req, res){
  db.run(`DELETE FROM Profiles WHERE id=${req.params.id};`);
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req, res, next){
  db.each(`SELECT * FROM Profiles WHERE id=${req.params.id};`, function(err, data){
    if(!err){
      db.all(`SELECT * FROM Contacts`, function(err, rows){
        if(!err){
        res.render('editProfiles', {dataProfile : data, dataContact : rows})
      }
      })
    }
  })
})

app.post('/profiles/edit/:id', function(req, res){
  db.run(`UPDATE Profiles SET username='${req.body.saveUsername}',
  password='${req.body.savePassword}',
  Contact_id='${req.body.saveContactID}' WHERE id=${req.params.id};`)
  res.redirect('/profiles')
})

app.get('/address', function(req, res){
  db.all('SELECT Address.id, Address.street, Address.city, Address.zip_code, Address.ContactId, Contacts.name, Contacts.company FROM Address JOIN Contacts ON Address.ContactId = Contacts.id;', function(err, rows){
    if(!err){
      db.all('SELECT Contacts.id, Contacts.name FROM Contacts;', function(err, data){
        if(!err){
          res.render('address', {data_address : rows, data_contact : data})
        }
      })
    }
  })
})

app.post('/address', function(req, res){
  db.run(`INSERT INTO Address(street, city, zip_code, ContactId) VALUES ('${req.body.saveStreet}', '${req.body.saveCity}', '${req.body.saveZIP}', ${req.body.saveContactsID});`)
  res.redirect('/address')
})

app.get('/address/delete/:id', function(req, res){
  db.run(`DELETE FROM Address WHERE id=${req.params.id};`);
  res.redirect('/address')
})

app.get('/address/edit/:id', function(req, res){
  db.each(`SELECT * FROM Address WHERE id=${req.params.id};`, function(err, data){
    if(!err){
      db.all(`SELECT * FROM Contacts`, function(err, rows){
        if(!err){
          res.render('editAddress', {dataAddress : data, dataContact : rows})
        }
      })
    }
  })
})

app.post('/address/edit/:id', function(req, res){
  db.run(`UPDATE Address SET
    street='${req.body.saveStreet}',
    city='${req.body.saveCity}',
    zip_code='${req.body.saveZIP}',
    ContactId='${req.body.saveContactsID}' WHERE
    id=${req.params.id};`);
    res.redirect('/address')
})


app.listen(3000)
