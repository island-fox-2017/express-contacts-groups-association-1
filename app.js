const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const DbModel = require('./models/DbModel');
const Contact = require('./models/Contacts');
const Group = require('./models/Groups');
const Profile = require('./models/Profiles');
const Address = require('./models/Addresses');
const Contact_Group = require('./models/Contacts_Groups');

let myQuery = require('./myQuery.js');

let dbModel = new DbModel('./db/data.db');
let db = new sqlite3.Database('./db/data.db');
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.render('index');
});

// app.get('/contacts', function(req, res) {
//   Contact.showData(dbModel.connection, function(err, rows) {
//     if(!err) {
//       //res.send(rows);
//       res.render('contacts', {datas: rows});
//     }
//   });
// });

// app.get('/contacts', function (req, res) {
//   res.send(Contact.callContactPromise());
// });


app.get('/contacts', function (req, res) {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        db.all(`
          SELECT
            *
          FROM
            Groups AS g
          JOIN Contacts_Groups AS cg
            ON g.id = cg.group_id
          JOIN Contacts AS c
            ON c.id = cg.contact_id
          ;
          `, function(err, rows2) {
            if(!err) {
              res.render('contacts', {datas: rows, slice: rows2});
              //res.send(rows2);
            }
          });
      }
    });
});

  //Contact.showContact(dbModel.connection, );

  //var datas = Contact.callContactPromise()
/*
  Contact.showAll(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('contacts', {datas: rows});
    }
  });


*/


app.post('/contacts', function (req, res) {
  Contact.insertData(dbModel.connection, req.body);
  res.redirect('/contacts')
});

app.get('/contacts/delete/:id', function(req, res) {
  Contact.deleteData(dbModel.connection, req.params.id);
  res.redirect('/contacts');
});

app.get('/contacts/edit/:id', function (req, res) {
  Contact.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit', {data: rows});
    }
  });
});

app.post('/contacts/edit/:id', function (req, res) {
  Contact.updateData(dbModel.connection, req.body);
  res.redirect('/contacts');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Groups

app.get('/groups', function (req, res) {
  Group.showData(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('groups', {datas: rows});
    }
  })
});

app.post('/groups', function (req, res) {
  Group.insertData(dbModel.connection, req.body);
  res.redirect('/groups')
});

app.get('/groups/delete/:id', function(req, res) {
  Group.deleteData(dbModel.connection, req.params.id);
  res.redirect('/groups');
});

app.get('/groups/edit/:id', function (req, res) {
  Group.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_groups', {data: rows});
    }
  });
});

app.post('/groups/edit/:id', function (req, res) {
  Group.updateData(dbModel.connection, req.body);
  res.redirect('/groups');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Contacts-Groups

app.get('/contacts-groups', function(req, res) {
  Contact_Group.showData(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('contacts-groups', {datas: rows});
    }
  });
});

app.post('/contacts-groups', function(req, res) {
  Contact_Group.insertData(dbModel.connection, req.body);
  res.redirect('/contacts-groups');
});

app.get('/contacts-groups/delete/:id', function (req, res) {
  Contact_Group.deleteData(dbModel.connection, req.params.id);
  res.redirect('/contacts-groups');
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Profile Router

app.get('/profiles', function(req, res) {
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
  Profile.insertData(dbModel.connection, req.body);
  res.redirect('/profiles');
});

app.get('/profiles/delete/:id', function(req, res) {
  Profile.deleteData(dbModel.connection, req.params.id);
  res.redirect('/profiles');
});

app.get('/profiles/edit/:id', function(req, res) {
  Profile.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_profiles', {datas: rows});
    }
  });
});

app.post('/profiles/edit/:id', function(req, res) {
  Profile.updateData(dbModel.connection, req.body);
  res.redirect('/profiles');
});

app.get('/profiles/:id', function(req, res) {
  Profile.showProfileForContact(dbModel.connection, req.params.id, function (err, rows) {
    if(!err) {
      res.render('profileShow', {datas: rows});
    }
  })
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Address

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
  Address.insertData(dbModel.connection, req.body);
  res.redirect('/address');
});

app.get('/address/delete/:id', function(req, res) {
  Address.deleteData(dbModel.connection, req.params.id);
  res.redirect('/address');
});

app.get('/address/edit/:id', function(req, res) {
  Address.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit_address', {datas: rows});
    }
  });
});

app.post('/address/edit/:id', function (req, res) {
  Address.updateData(dbModel.connection, req.body);
  res.redirect('/address');
});

app.get('/address/:id', function(req, res) {
  Address.showAddressForContact(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('addressShow', {datas: rows});
    }
  })
});

app.listen(3002);
