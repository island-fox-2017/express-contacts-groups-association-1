var express = require('express');
var path = require('path');
var app = express();
var lib = require('./setup');
var bodyParser = require('body-parser');
//models
const DbModel = require('./models/DbModel');
const Contact = require('./models/contact');
const Groups = require('./models/groups');
const Profiles = require('./models/profiles');
const Address = require('./models/address');

//routing
const index = require('./routers/index');
const contacts = require('./routers/contacts');

let dbModel = new DbModel('db/database.db');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/contacts', contacts);

// app.get('/', function(req, res){
//   res.render('index');
// });

//FUNDAMENTALNYA
  // Contact.showContact(dbModel.connection, function(err, rows){
  //   console.log(rows);
  // });


  //----------------------GROUPS--------------------------

  app.get('/groups', function(req, res){
    Groups.showGroups(dbModel.connection, function(err, rows){
      res.render('groups', {group_data: rows});
    });
  });

  app.get('/insert_groups', function(req, res){
    res.render('groups');
  });

  app.post('/insert_groups', function(req, res){
    Groups.insertGroups(dbModel.connection, req.body)
    res.redirect('/groups');
  });
  //edit
  app.get('/groups/edit/:id', function (req, res){
    Groups.editGroups(dbModel.connection, req.params, function(err, rus){
      res.render('editGroups', {grup_data: rus});
    });
  });

  app.post('/groups/edit/:id', function(req, res){
    Groups.updateGroups(dbModel.connection, req.body, req.params);
    res.redirect('/groups');
  });

  app.get('/groups/delete/:id', function (req, res) {
    Groups.deleteGroups(dbModel.connection, req.params);
      res.redirect('/groups');
  });


  //----------------------PROFILE--------------------------

  app.get('/profile', function(req, res){
    Profiles.showProfiles(dbModel.connection, function(err, low){
      if(!err){
        Profiles.showProfiles(dbModel.connection, function(err, lower){
        res.render('profile', {prf: low, dataCont: lower})
        });
      };
    });
  });

  app.get('/profile/:id/contact_detail', function(req, res){
    Profiles.contactDetail(dbModel.connection, req.params, function(err, data){
      res.render('profileContact', {dataProfileCont: data});
    });
  });

  // app.get('/profile', function(req, res){
  //   res.render('profile');
  // });
  // // //
  // app.post('/profile', function(req, res){
  //   Profiles.insertProfiles(dbModel.connection, req.body)
  //   res.redirect('/profile');
  // });
  // //
  // app.get('/profile/edit/:id', function(req, res){
  //   db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}'`, function(err, result){
  //     if(!err){
  //       db.all(`SELECT id, name FROM Contacts`, function (err, result2){
  //         res.render('editProfile', {dataprofile: result, dataCon: result2});
  //       });
  //     }
  //   });
  //   Profiles.editProfiles(dbModel.connection, function(err, result){
  //     if(!err){
  //       Profiles.edit
  //     }
  //   }
  // });
  //
  // app.post('/profile/edit/:id', function(req, res){
  //   db.run(`UPDATE Profiles SET username = '${req.body.nickname}', age = '${req.body.age_profile}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`);
  //   res.redirect('/profile');
  //});

  app.get('/profile/delete/:id', function(req, res){
    Profiles.deleteProfiles(dbModel.connection, req.params);
    res.redirect('/profile');
  });

  //------------------------ADDRESS---------------------------------

  // app.get('/addresses', function(req, res){
  //   Address.showAddresses(dbModel.connection, function(err, row){
  //     if(!err){
  //       Address.showAddresses(dbModel.connection, function(err, rowses){
  //       res.render('addresses', {dataAddress: rows, dataCon: rowses});
  //       });
  //     };
  //   });
  // });
  //
  // app.post('/addresses', function(req, res){
  //   db.run(`INSERT INTO Address(street, city, province, zipcodes, contact_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.province}', '${req.body.zipcodes}', '${req.body.contact_id}')`);
  //   res.redirect('/addresses');
  // });
  //
  // app.get('/addresses/edit/:id', function(req, res){
  //   db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err, result){
  //     if (!err) {
  //       db.all(`SELECT id, name FROM Contacts`, function (err, result2){
  //       res.render('editAddress', {dataAddress: result, dataCon: result2});
  //     });
  //     }
  //   });
  // });
  //
  // app.post('/addresses/edit/:id', function(req, res){
  //   db.run(`UPDATE Address SET street = '${req.body.street}', city = '${req.body.city}', province= '${req.body.province}', zipcodes = '${req.body.zipcodes}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`);
  //   res.redirect('/addresses');
  // });
  //
  // app.get('/addresses/:id/address_detail', function(req, res){
  //   db.all(`SELECT * FROM Contacts JOIN Address ON Address.contact_id = Contacts.id WHERE Contacts.id = ${req.params.id}`, function(err, data){
  //     res.render('contactAddress', {dataAddress: data});
  //   });
  // });
  //
  // app.get('/addresses/delete/:id', function(req, res){
  //   db.run(`DELETE FROM Address WHERE id = ${req.params.id}`);
  //   res.redirect('/addresses');
  // });











app.listen(3001);
