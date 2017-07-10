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


'use strict'
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
})



//ROUTING TABLE Contacts

app.get('/contacts/address/:id', function(req, res){
  db.all(`SELECT * FROM Address JOIN Contacts
    ON Contacts.id = Address.contacts_id
    WHERE Address.contacts_id = ${req.params.id}`, function(errs, rows) {
    if(!errs)
    {
      res.render('addressDetails', {datas : rows});
    }
  })
})

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows) {
    if(!err) {
      res.render('contacts', {data: rows});
    }
  })
})

app.post('/contacts', function(req, res){
  let data = req.body;
  insertDataContact(data);

  res.redirect('/contacts');
})

app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM contacts WHERE id = '${req.params.id}'`, function(err, rows) {
    if(!err) {
      res.render('edit', {data: rows});
    }
  })
})

app.get('/contacts/delete/:id', function(req, res){
    deleteDataContacs(req.params.id);
    res.redirect('/contacts');
})

app.post('/contacts/update/:id', function(req, res){
  let data = req.body;
  updateDataContact(data, req.params.id);

  res.redirect('/contacts');
})


//ROUTING TABLE Groups

app.get('/groups', function(req, res){

  db.all(`SELECT * FROM Groups`, function(errs, rows){
    if(!errs){
      res.render('groups', {data: rows})
    }
  })
    // db.all(`SELECT * FROM Groups AS g JOIN GroupsContacts AS gc
    //     ON g.id = gc.groups_id JOIN Contacts AS c
    //     ON c.id = gc.contacts_id`, function(errs, rows){
    //       if(!errs){
    //         res.render('groups', {data : rows})
    //       }
    //     })
})

app.get('/groups/details', function(req, res){
  db.all(`SELECT *
    FROM Groups AS g JOIN GroupsContacts AS gc
      ON g.id = gc.groups_id JOIN Contacts AS c
      ON c.id = gc.contacts_id`, function(errs, rows){
        if(!errs){
          console.log(rows);
          res.render('groups-details', {data : rows})
        }
      })
})

app.get('/groups/delete/:id', function(req, res){
  deleteDataGroups(req.params.id);
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
    if(!err){
      res.render('editGroups', {data:rows});
    }
  })
})


app.post('/groups/update/:id', function(req, res){
  let data = req.body;
  updateDataGroups(data, req.params.id);

  res.redirect('/groups')
})

app.post('/groups', function(req, res){
  let data = req.body;
  insertDataGrous(data);
  res.redirect('/groups');
})

//ROUTING PROFILE

app.get('/profiles', function(req, res){
  db.all(`SELECT * FROM Profiles`, function(errs, rows){
    if(!errs){
      db.all(`SELECT * FROM Contacts`, function(errs, data){
        if(!errs){
          res.render('profiles', {datas: rows, data_contact: data})
        }
      })
    }
  })
})


app.post('/profiles', function(req, res){
  let data = req.body;
  insertDataProfiles(data);

  res.redirect('/profiles');
})

app.get('/profiles/delete/:id', function(req, res){
  deleteDataProfiles(req.params.id);
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`, function(errs, rows) {
    if(!errs){
      db.all(`SELECT * FROM Contacts`, function(errs, data){
        if(!errs){
          res.render('editProfiles', {datas: rows, data_contact: data});
        }
      })

    }
  })
})

app.post('/profiles/update/:id', function(req, res){
  let data = req.body;
  updateDataProfiles(data, req.params.id);

  res.redirect('/profiles');
})

app.get('/profiles/details/:id', function(req, res) {
  console.log(`SELECT * FROM Profiles JOIN Contacts ON Profiles.contacts_id = Contacts.id WHERE Profiles.contacts_id = ${req.params.id}`);

  db.all(`SELECT * FROM Profiles JOIN Contacts ON Profiles.contacts_id = Contacts.id WHERE Profiles.contacts_id = ${req.params.id}`, function(errs, rows){
    if(!errs)
    {
      res.render('details', {datas: rows})
    }
  })
})



//ROUTING ADDRESS TABLE

app.get('/address', function(req, res){
  db.all(`SELECT * FROM Address`, function(errs, rows){
    if(!errs){
      db.all(`SELECT * FROM Contacts`, function(errs, data){
        if(!errs){
            res.render('address', {datas: rows, data_contact: data});
        }
      })
    }
  })
})


app.post('/address', function(req, res) {
  let data = req.body;
  insertDataAddress(data);
  res.redirect('/address')
})

app.get('/address/delete/:id', function (req, res) {
  deleteDataAddress(req.params.id)

  res.redirect('/address')
})

app.get('/address/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Address WHERE id = ${req.params.id}`, function(errs, rows){
    if(!errs){
      db.all(`SELECT * FROM Contacts`, function(errs, data){
        if(!errs){
            res.render('editAddress', {datas: rows, data_contact: data});
        }
      })
    }
  })
})

app.post('/address/update/:id', function(req, res){
  let data = req.body;
  updateDataAddress(data, req.params.id);

  res.redirect('/address');
})

//GROUPS CONTACTS ROOTING

app.get('/groups-contacts', function(req, res){
  db.all(`SELECT * FROM GroupsContacts`, function(errs, rows_gc){
    if(!errs){
      db.all(`SELECT * FROM Contacts`, function(errs, rows_c){
        if(!errs){
          db.all(`SELECT * FROM Groups`, function(errs, rows_g){
            if(!errs){
              res.render('groups-contacts', {data_gc: rows_gc, data_c: rows_c, data_g: rows_g});
            }
          })
        }
      })
    }
  })
})

app.post('/groups-contacts', function(req, res){
  let data = req.body;
  insertDataGroupsContacts(data);
  res.redirect('/groups-contacts');
})


//port server
app.listen(3000);









//QUERY


function sendView(obj){
  return obj;
  let result = [];
  let check = {}
  for(let i = 0; i < obj.length; i++)
  {
      for(let j = 0; j < obj.length; j++)
      {
          if(check != true)
          {

          }
          result.push(obj[i])
      }
  }
}

//QUERY GROUPS CONTACT

function insertDataGroupsContacts(obj){
  db.run(`INSERT INTO GroupsContacts (groups_id, contacts_id)
  VALUES (${obj.groups_id}, ${obj.contacts_id})`)
}

//ADDRESS QUERY
function insertDataAddress(obj) {
  db.run(`INSERT INTO Address (street, city, zip_code, contacts_id)
  VALUES ('${obj.street}', '${obj.city}', '${obj.zip_code}', ${obj.contacts_id})`)
}

function deleteDataAddress(id){
  db.run(`DELETE FROM Address WHERE id = ${id}`);
}

function updateDataAddress(obj, id){
  db.run(`UPDATE Address SET
    street = '${obj.street}',
    city = '${obj.city}',
    zip_code = '${obj.zip_code}',
    contacts_id = ${obj.contacts_id}
    WHERE id = ${id};`);
}


//PROFILES QUERY
function insertDataProfiles(obj){
  db.run(`INSERT INTO Profiles (username, password, contacts_id)
    VALUES ('${obj.username}', '${obj.password}', ${obj.contacts_id})`);
}

function deleteDataProfiles(id){
  db.run(`DELETE FROM Profiles WHERE id = ${id}`);
}

function updateDataProfiles(obj, id){
  db.run(`UPDATE Profiles SET
    username = '${obj.username}',
    password = '${obj.password}',
    contacts_id = ${obj.contacts_id}
    WHERE id = ${id};`);
}

//CONTACTS TABLE QUERY
function updateDataContact(obj, id){
  db.run(`UPDATE Contacts SET
    name = '${obj.name}',
    company = '${obj.company}',
    telp_number = '${obj.telp_number}',
    email = '${obj.email}'
    WHERE id = '${id}';`);
}

function insertDataContact(obj){
  db.run(`INSERT INTO Contacts (name, company, telp_number, email)
    VALUES ('${obj.name}', '${obj.company}', '${obj.telp_number}', '${obj.email}')`)
}

function deleteDataContacs(id){
  db.run(`DELETE FROM Contacts WHERE id = ${id}`)
}


//GROUP TABLE QUERY
function insertDataGrous(obj){
  db.run(`INSERT INTO Groups (name_of_group)
  VALUES ('${obj.name_of_group}')`)
}

function deleteDataGroups(id){
  db.run(`DELETE FROM Groups WHERE id = ${id}`)
}

function updateDataGroups(obj, id){
  db.run(`UPDATE Groups SET name_of_group = '${obj.name_of_group}' WHERE id = '${id}'`)
}
