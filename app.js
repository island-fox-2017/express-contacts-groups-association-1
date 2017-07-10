const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contacts', function (req, res) {
  db.all(`SELECT * FROM contacts`, function(err, rows) {
    if(!err) {
        res.render('contacts', {data: rows})
    }
  })
})

app.post('/contacts', function(req, res) {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let company = req.body.company;
  let telp_number = req.body.telp_number;
  let email = req.body.email;

  db.run(`INSERT INTO contacts (first_name, last_name, company, telp_number, email)
  VALUES ('${first_name}', '${last_name}', '${company}', '${telp_number}', '${email}');`)
  console.log('Data created');

  res.redirect('/contacts')
});

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM contacts WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('edit', {data: rows})
    }
  })
})

app.post('/contacts/update/:id', function(req, res) {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let company = req.body.company;
  let telp_number = req.body.telp_number;
  let email = req.body.email;

  db.run(`UPDATE contacts set first_name = '${first_name}', last_name = '${last_name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${id};`);
  console.log('Data updated');
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM Contacts WHERE id = ${id};`)
  res.redirect('/contacts');
})

//========================================PROFILE============================================================//

app.get('/profiles', function (req, res) {
  db.all(`SELECT * FROM profile`, function(err, rows) {
    if(!err) {
      db.all(`SELECT id, first_name || ' ' || last_name as long_name FROM contacts`, function(err, rows2){
        res.render('profiles', {data: rows, data2: rows2})
      })
    }
  })
})

app.post('/profiles', function(req, res) {
  let username = req.body.username;
  let pwd = req.body.pwd;
  let contact_id = req.body.selectIdContact;

  db.run(`INSERT INTO profile (username, pwd, contact_id)
  VALUES ('${username}', '${pwd}', '${contact_id}');`)
  console.log('Data profile created');

  res.redirect('/profiles')
});

app.get('/profiles/edit/:id', function(req, res) {
  db.all(`SELECT * FROM profile WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('profile-edit', {data: rows})
    }
  })
})

app.post('/profiles/update/:id', function(req, res) {
  let id = req.params.id;
  let username = req.body.username;
  let pwd = req.body.pwd;
  let contact_id = req.body.contact_id;

  db.run(`UPDATE profile set username = '${username}', pwd = '${pwd}', contact_id = '${contact_id}' WHERE id = ${id};`);
  console.log(`Data profile ${id} updated`);
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM profile WHERE id = ${id};`)
  console.log(`ID ${id} deleted`);
  res.redirect('/profiles');
})

//=======================================CONTACTPROFILE======================================================//

app.get('/contacts/detail_profile/:id', function(req, res) {
  db.all(`SELECT * FROM contacts JOIN profile on contacts.id = profile.contact_id WHERE contacts.id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('contacts-profile', {data: rows})
    }
  })
});

//===========================================CONTACTADDRESS=================================================//

app.get('/contacts/detail_address/:id', function(req, res) {
  db.all(`SELECT * FROM contacts JOIN address on contacts.id = address.contact_id WHERE contacts.id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('contacts-address', {data: rows})
    }
  })
});

//========================================ADDRESS============================================================//

app.get('/addresses', function (req, res) {
  db.all(`SELECT * FROM address`, function(err, rows) {
    if(!err) {
      db.all(`SELECT id, first_name || ' ' || last_name as long_name FROM contacts`, function(err, rows2){
        res.render('addresses', {data: rows, data2: rows2})
      })
        // res.render('addresses', {data: rows})
    }
  })
})

app.post('/addresses', function(req, res) {
  let street = req.body.street;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let contact_id = req.body.selectIdContact;

  db.run(`INSERT INTO address (street, city, zip_code, contact_id)
  VALUES ('${street}', '${city}', '${zip_code}', '${contact_id}');`)
  console.log('Data address created');

  res.redirect('/addresses')
});

app.get('/addresses/edit/:id', function(req, res) {
  db.all(`SELECT * FROM address WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('address-edit', {data: rows})
    }
  })
})

app.post('/addresses/update/:id', function(req, res) {
  let id = req.params.id;
  let street = req.body.street;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let contact_id = req.body.contact_id;

  db.run(`UPDATE address set street = '${street}', city = '${city}', zip_code = '${zip_code}', contact_id = '${contact_id}' WHERE id = ${id};`);
  console.log(`Data address ${id} updated`);
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM address WHERE id = ${id};`)
  console.log(`ID ${id} deleted from address table`);
  res.redirect('/addresses');
})

//===================================GROUPS==================================================================//

app.get('/groups', function (req, res) {
  db.all(`SELECT * FROM groups`, function(err, rows) {
    if(!err) {
        res.render('groups', {data: rows})
    }
  })
})

app.post('/groups', function(req, res) {
  let name_group = req.body.name_group;

  db.run(`INSERT INTO groups (name_group) VALUES ('${name_group}');`)
  console.log('Data created');

  res.redirect('/groups')
});

app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM groups WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('group-edit', {data: rows})
    }
  })
})

app.post('/groups/update/:id', function(req, res) {
  let id = req.params.id;
  let name_group = req.body.name_group;

  db.run(`UPDATE groups set name_group = '${name_group}' WHERE id = ${id};`);
  console.log('Data updated');
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM groups WHERE id = ${id};`)
  res.redirect('/groups');
})

//======================================CONTACTGROUP=====================================//
app.get('/contactgroup', function (req, res) {
  db.all(`select contactgroup.id as contactgroupID, contacts.id as contact_id, contacts.first_name || ' ' || contacts.last_name as long_name, groups.id as group_id, groups.name_group as group_name from contactgroup
join contacts
on contactgroup.contact_id = contacts.id
join groups
on contactgroup.group_id = groups.id`, function(err, rows) {
    if(!err) {
      db.all(`SELECT id, first_name || ' ' || last_name as long_name FROM contacts`, function(err, rows2){
        if (!err) {
          db.all(`SELECT * FROM groups`, function(err, rows3){
            res.render('contactgroup', {data: rows, data2: rows2, data3: rows3})
          })
        }
      })
    }
  })
})

app.post('/contactgroup', function(req, res) {
  let contact_id = req.body.selectIdContact;
  let group_id = req.body.selectIdGroup;

  db.run(`INSERT INTO contactgroup (contact_id, group_id) VALUES ('${contact_id}', '${group_id}');`)
  console.log('Data created');

  res.redirect('/contactgroup')
});

app.listen(3000);
