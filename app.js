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

const express = require('express');
const sqlite3 = require('sqlite3').verbose();


var app = express();
var db = new sqlite3.Database('./db/contact_group.db')
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


//routing Main page
app.get('/', function (req, res){
  
  res.render('index',{header : 'This is main page'});
})

//routing contacts
app.get('/contacts', function(req, res){
  db.all(`select * from Contacts`, function (err, data){
    res.render('contacts',{header : 'This is contacts page', data_contacts : data})
  })
  
})

app.post('/contacts', function(req, res){
  db.run(`insert into Contacts (name, company, telp_number, email) 
        values ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`)
  res.redirect('/contacts')
})


app.get('/contacts/edit/:id', function(req, res){
  db.all(`select * from 'Contacts' where id='${req.params.id}' `, function(err, data){
    if(!err){
    res.render('edit_contact', {header: 'Edit Contact Page', data_contacts : data})
  }
  });
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`update Contacts set name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' where id = '${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res){
  db.run(`delete from 'Contacts' where id='${req.params.id}'`);
  res.redirect(`/contacts`)
})

//routing groups

app.get('/input_data_groups', function(req, res){
  db.run(`insert into Groups (name_of_group) 
        values ('hacktiv8')`);
  res.send('input data group berhasil');
})

app.get('/groups', function(req, res){
  db.all(`select * from Groups`, function(err, data){
    if(!err){
      res.render('groups', {header : 'Groups Page', data_groups : data})
    }
  })
})

app.post('/groups', function (req, res){
  db.run(`insert into Groups (name_of_group) values ('${req.body.name_of_group}')`);
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`select * from Groups where id = '${req.params.id}'`, function (err, data){
    if(!err){
      res.render('edit_group', {header : 'Edit Group Page', data_groups : data})
    }
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`update Groups set name_of_group = '${req.body.name_of_group}' where id = '${req.params.id}'`);
  res.redirect('/groups')
})


app.get('/groups/delete/:id', function(req, res){
  db.run(`delete from 'Groups' where id = '${req.params.id}'`);
  res.redirect('/groups');
})

app.get('/profiles', function(req, res){
  db.all(`select Profiles.id, Profiles.username, Profiles.password, Profiles.contacts_id, Contacts.name, Contacts.company, contacts.telp_number from
Profiles join Contacts on Profiles.contacts_id = Contacts.id `, function(err, data){
    db.all(`select * from Contacts`, function (err, data2){
    res.render('profiles', {header : 'Profiles Page', data_profiles : data, data_contacts : data2});
  })    
  })
})

app.post('/profiles', function(req, res){
  db.run(`insert into 'Profiles' (username, password, contacts_id) values ('${req.body.username}','${req.body.password}','${req.body.contacts_id}')`);
  res.redirect('/profiles');
})


app.get('/profiles/edit/:id', function (req, res){
  db.all(`select * from 'Profiles' where id = '${req.params.id}'`, function (err, data){
    db.all(`select * from 'Contacts'`, function(err, data2){
      res.render('edit_profiles', {header : 'Edit Profiles Page',data_profiles : data, data_contacts: data2})
    })
  });
})

app.post('/profiles/edit/:id', function (req, res){
  db.run(`update Profiles set username = '${req.body.username}', password = '${req.body.password}', contacts_id = '${req.body.contacts_id}' where id = '${req.params.id}'`);
  res.redirect('/profiles');
})

app.get('/profiles/delete/:id', function (req, res){
  db.run(`delete from Profiles where id = '${req.params.id}'`);
  res.redirect('/profiles')
})

app.get('/address', function (req, res){
  db.all(`select Address.id, street, city, zip_code, contacts_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email from Address join Contacts on contacts_id = Contacts.id`, function (err, data){
      db.all(`select * from Contacts`, function(err, data2){
        console.log(data);
        res.render('address', {header : 'This is Address Page', data_addresses : data, data_contacts: data2})
  })
})
})

app.post('/address', function(req, res){
  db.run(`insert into Address (street, city, zip_code, contacts_id) values ('${req.body.street}','${req.body.city}','${req.body.zip_code}','${req.body.contacts_id}')`);
  res.redirect('/address');
})

app.get('/address/edit/:id', function(req, res){
  db.all(`select * from Address where id = '${req.params.id}'`, function (err, data){
    db.all(`select * from Contacts`, function (err, data2){
      res.render('edit_address', {header : 'Address Edit Page', data_address : data, data_contacts : data2});
    })
    
  })
})

app.post('/address/edit/:id', function(req, res){
  db.run(`update Address set street='${req.body.street}', city = '${req.body.city}', zip_code='${req.body.zip_code}', contacts_id='${req.body.contacts_id}' where id='${req.params.id}'`);
  res.redirect('/address');
})

app.get('/address/delete/:id', function(req, res){
  db.run(`delete from Address where id = '${req.params.id}'`);
  res.redirect('/address');
})


app.listen(3000)
