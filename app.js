const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

let myQuery = require('./myQuery.js');

let db = new sqlite3.Database('./db/data.db');
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.render('index');
});
/*
SELECT
  Contacts.*,
  Profiles.username
FROM
  Contacts
LEFT JOIN Profiles ON
  Contacts.id = Profiles.contact_id;
*/
app.get('/contacts', function (req, res) {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        res.render('contacts', {datas: rows});
      }
    });


});

app.post('/contacts', function (req, res) {
  let objStartup = {}
  objStartup.name = req.body.name;
  objStartup.company = req.body.company;
  objStartup.telp_number = req.body.telp_number;
  objStartup.email = req.body.email;

  myQuery.insertData(objStartup);
  //myQuery.showData();
  res.redirect('/contacts')
});

app.get('/contacts/delete/:id', function(req, res) {
  let deleteId = req.params.id;
  myQuery.deleteData(deleteId);
  res.redirect('/contacts');
});

app.get('/contacts/edit/:id', function (req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Contacts WHERE id = ${editId};
    `, function (err, rows) {
      if (!err) {
        res.render('edit', {data: rows});
      }
    });
});

app.post('/contacts/edit/:id', function (req, res) {
  let objEdit = {};
  objEdit.id = req.body.id;
  objEdit.name = req.body.name;
  objEdit.company = req.body.company;
  objEdit.telp_number = req.body.telp_number;
  objEdit.email = req.body.email;

  myQuery.editData(objEdit);
  res.redirect('/contacts');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Groups

app.get('/groups', function (req, res) {
  db.all(`
    SELECT
      *
    FROM
      Contacts_Groups
    LEFT JOIN Groups ON
      Groups.id = Contacts_Groups.group_id
    LEFT JOIN Contacts ON
      Contacts.id = Contacts_Groups.contact_id;
    `, function(err, rows) {
      if(!err) {
        res.render('groups', {datas: rows});
      }
    });
});

app.post('/groups', function (req, res) {
  let objStartup = {}
  objStartup.name_of_group = req.body.name_of_group;

  myQuery.insertData2(objStartup);
  //myQuery.showData();
  res.redirect('/groups')
});

app.get('/groups/delete/:id', function(req, res) {
  let deleteId = req.params.id;
  myQuery.deleteData2(deleteId);
  res.redirect('/groups');
});

app.get('/groups/edit/:id', function (req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Groups WHERE id = ${editId};
    `, function (err, rows) {
      if (!err) {
        res.render('edit_groups', {data: rows});
      }
    });
});

app.post('/groups/edit/:id', function (req, res) {
  let objEdit = {};
  objEdit.id = req.body.id;
  objEdit.name_of_group = req.body.name_of_group;

  myQuery.editData2(objEdit);
  res.redirect('/groups');
});

/*
SELECT
  *
FROM
  Contacts_Groups
JOIN Contacts ON
  Contacts_Groups.contact_id = Contacts.id
JOIN Groups ON
  Contacts_Groups.group_id = Groups.id;
*/
app.get('/contacts-groups', function(req, res) {
  db.all(`
    SELECT * FROM Contacts_Groups;
    `, function(err, rows) {
      if(!err) {
        res.render('contacts-groups', {datas: rows});
      }
    });
});

app.post('/contacts-groups', function(req, res) {
  myQuery.insertData5(req.body);
  res.redirect('/contacts-groups');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Profile Router

app.get('/profiles', function(req, res) {
  let profileId = req.params.id;

  db.all(`
    SELECT * FROM Profiles;
    `, function(err, rows) {
      if (!err) {
        db.all(`
          SELECT id, name FROM Contacts;
          `, function (err, rows2) {
            if(!err) {
              res.render('profiles', {datas: rows, selectContact: rows2});
            }
          });
      }
    });
});

app.post('/profiles', function (req, res) {
  myQuery.insertData3(req.body);
  res.redirect('/profiles');
});

app.get('/profiles/delete/:id', function(req, res) {
  let profileId = req.params.id;
  myQuery.deleteData3(profileId);
  res.redirect('/profiles');
});

app.get('/profiles/edit/:id', function(req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Profiles WHERE id = ${editId};
    `, function(err, rows) {
      if(!err) {
        res.render('edit_profiles', {datas: rows});
        //res.send(rows);
      }
    });
});

app.post('/profiles/edit/:id', function(req, res) {
  myQuery.editData3(req.body);
  res.redirect('/profiles');
});

app.get('/profiles/:id', function(req, res) {
  let profileId = req.params.id;

  db.all(`
    SELECT
      Contacts.*,
      Profiles.username,
      Profiles.password
    FROM
      Contacts
    LEFT JOIN Profiles ON
      Contacts.id = Profiles.contact_id
    WHERE
      Contacts.id = ${profileId};
    `, function (err, rows) {
      if(!err) {
        res.render('profileShow', {datas: rows});
      }
    });
});

app.get('/address', function(req, res) {
  db.all(`
    SELECT * FROM Address;
    `, function(err, rows) {
      if(!err) {
        db.all(`
          SELECT id, name FROM Contacts;
          `, function(err, rows2) {
            if(!err) {
              res.render('address', {datas: rows, selectContact: rows2});
            }
        });
      }
    });
});

app.post('/address', function(req, res) {
  myQuery.insertData4(req.body);
  res.redirect('/address');
});

app.get('/address/delete/:id', function(req, res) {
  let deleteId = req.params.id;
  myQuery.deleteData4(deleteId);
  res.redirect('/address');
});

app.get('/address/edit/:id', function(req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Address WHERE id = ${editId};
    `, function(err, rows) {
      if(!err) {
        res.render('edit_address', {datas: rows});
      }
    });
});

app.post('/address/edit/:id', function (req, res) {
  myQuery.editData4(req.body);
  res.redirect('/address');
});

app.get('/address/:id', function(req, res) {
  let showId = req.params.id;

  db.all(`
    SELECT
      Contacts.*,
      Address.street, Address.city, Address.zip_code
    FROM
      Contacts
    JOIN Address ON
      Contacts.id = Address.contact_id
    WHERE
      Address.contact_id = ${showId};
    `, function(err, rows) {
      if(!err) {
        res.render('addressShow', {datas: rows});
      }
    });
});

app.listen(3002);
