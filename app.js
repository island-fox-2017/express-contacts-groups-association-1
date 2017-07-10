var express = require('express');
var path = require('path');
var app = express();
var lib = require('./setup');

var sqlite = require('sqlite3').verbose(); //verbose untuk perbaris
var db = new sqlite.Database('./db/database.db');

app.set('view engine', 'ejs');

// app.use('/foo', router);
// var removeRoute = require('express-remove-route');
// var router = express.Router();
// removeRoute(app, '/foo/contacts/delete:id','get');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/setupdb', function(req, res){
  lib();
  res.send('Berhasil SetUp Database');
});
app.get('/dbgroup', function(req, res){
  db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group varchar(25) );`);
  res.send('Success add Groups Table');
  // res.redirect('groups');
});
app.get('/dbprofile', function(req, res){
  db.run(`CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT, username text, age INTEGER)`);
  res.send('Database Profile succes created');
});

app.get('/dbaddress', function(req, res){
  db.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT, street varchar(255), city varchar(255), province varchar(255), zipcodes INTEGER, contact_id INTEGER)`);
  res.send('Database Address created');
});


app.get('/', function(req, res){
  res.render('index');
});

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows){
    res.render('contacts', {data: rows});
  });
});

app.get('/insert_data', function(req, res){
  res.render('contacts');
});

app.post('/insert_data', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES ('${req.body.ownerName}', '${req.body.company}','${req.body.telpComp}', '${req.body.emailCompany}')`);
  res.redirect('contacts');
});

//edit
app.get('/contacts/edit/:id', function (req, res){
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, function(err, ris){
  res.render('edit', {edit_data: ris});
  });
});

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name ='${req.body.ownerName}', company ='${req.body.company}', telp_number ='${req.body.telpComp}', email ='${req.body.emailCompany}' WHERE id= '${req.params.id}' `)
  res.redirect('/contacts');
});

app.get('/contacts/delete/:id', function (req, res) {
  db.all(`DELETE FROM Contacts WHERE id = '${req.params.id}'`);
    res.redirect('/contacts');
});

//groups
app.get('/groups', function(req, res){
  db.all(`SELECT * FROM Groups`, function(err, rows){
    res.render('groups', {group_data: rows});
  });
});

app.get('/insert_groups', function(req, res){
  res.render('groups');
});

app.post('/insert_groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.nameGroups}')`);
  res.redirect('groups');
});
//edit
app.get('/groups/edit/:id', function (req, res){
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err, rus){
  res.render('editGroups', {grup_data: rus});
  });
});

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group ='${req.body.nameGroups}' WHERE id= '${req.params.id}' `)
  res.redirect('/groups');
});

app.get('/groups/delete/:id', function (req, res) {
  db.all(`DELETE FROM Groups WHERE id = '${req.params.id}'`);
    res.redirect('/groups');
});


//profile
app.get('/profile', function(req, res){
  db.all(`SELECT * FROM Profiles`, function(err, low){
    if(!err){
      db.all(`SELECT id, name FROM Contacts`, function(err, lower){
        res.render('profile', {prf: low, dataCont: lower});
      });
    }
  });
});

app.get('/profile/:id/contact_detail', function(req, res){
  db.all(`SELECT * FROM Profiles JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Contacts.id = ${req.params.id}`, function(err, data){
    res.render('profileContact', {dataProfileCont: data});
  });
});

app.get('/profile', function(req, res){
  res.render('profile');
});

app.post('/profile', function(req, res){
  db.run(`INSERT INTO Profiles(username, age, contact_id) VALUES ('${req.body.nickname}', '${req.body.age_profile}', '${req.body.contact_id}')`);
  res.redirect('/profile');
});

app.get('/profile/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}'`, function(err, result){
    if(!err){
      db.all(`SELECT id, name FROM Contacts`, function (err, result2){
        res.render('editProfile', {dataprofile: result, dataCon: result2});
      });
    }
  });
});

app.post('/profile/edit/:id', function(req, res){
  db.run(`UPDATE Profiles SET username = '${req.body.nickname}', age = '${req.body.age_profile}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`);
  res.redirect('/profile');
});
// delete data
app.get('/profile/delete/:id', function(req, res){
  db.run(`DELETE FROM Profiles WHERE id = '${req.params.id}'`);
  res.redirect('/profile');
});

//alter
app.get('/addtable', function(req, res){
  db.all(`ALTER TABLE Profiles ADD column contact_id INTEGER `);
  res.send('Menambahkan Kolom Kontak di Table Profiles');
});

app.get('/addresses', function(req, res){
  db.all('SELECT * FROM Address', function(err, rows){
    if(!err){
      db.all(`SELECT id, name FROM Contacts`, function(err, rowses){
        res.render('addresses', {dataAddress: rows, dataCon: rowses});
      });
    }
  });
});
app.post('/addresses', function(req, res){
  db.run(`INSERT INTO Address(street, city, province, zipcodes, contact_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.province}', '${req.body.zipcodes}', '${req.body.contact_id}')`);
  res.redirect('/addresses');
});

app.get('/addresses/edit/:id', function(req, res){
  db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err, result){
    if (!err) {
      db.all(`SELECT id, name FROM Contacts`, function (err, result2){
      res.render('editAddress', {dataAddress: result, dataCon: result2});
    });
    }
  });
});

app.post('/addresses/edit/:id', function(req, res){
  db.run(`UPDATE Address SET street = '${req.body.street}', city = '${req.body.city}', province= '${req.body.province}', zipcodes = '${req.body.zipcodes}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`);
  res.redirect('/addresses');
});

app.get('/addresses/:id/address_detail', function(req, res){
  db.all(`SELECT * FROM Contacts JOIN Address ON Address.contact_id = Contacts.id WHERE Contacts.id = ${req.params.id}`, function(err, data){
    res.render('contactAddress', {dataAddress: data});
  });
});

app.get('/addresses/delete/:id', function(req, res){
  db.run(`DELETE FROM Address WHERE id = ${req.params.id}`);
  res.redirect('/addresses');
});





app.listen(3001);
