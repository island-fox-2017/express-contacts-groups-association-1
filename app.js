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
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

var setupDB = require('./setup');

app.set('view engine', 'ejs');

app.use(bodyParser.json());// digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({extended : true}));// hasil post di encoded

var path_name = path.join(__dirname, 'public');// untuk memanggil isi file dari public yg non ejs, ejs tidak boleh di dalam folder public, karna public hanya untuk file yang bersifat static
var express_static = express.static(path_name);

//create table contact
app.get('/setupdb', function(req, res){
  setupDB();
  res.send('Database Table Created!!');
});
//create table ContactGroup
app.get('/dbgroup', function(req, res){
  db.run('CREATE TABLE IF NOT EXISTS ContactGroup(id INTEGER primary key AUTOINCREMENT, GroupName TEXT)');
  res.send('Database Group telah di buat');
});
//create table Profiles
app.get('/dbprofiles', function(req, res){
  db.run('CREATE TABLE IF NOT EXISTS Profiles(id INTEGER primary key AUTOINCREMENT, Username TEXT, Password TEXT, Contact_Id INTEGER )');
  res.send('Database Profiles telah di buat');
});
//create table address
app.get('/dbaddress', function(req, res){
  db.run('CREATE TABLE IF NOT EXISTS Address(id INTEGER primary key AUTOINCREMENT, street TEXT, City TEXT, zipcode INTEGER, contact_id INTEGER)');
  res.send('Database Address telah di buat');
})

//---------------GAP-------------------//
//-----------------------------------//
//home page
app.get('/home', function(req, res){
  res.render('home');
});
//contact page
app.get('/contact', function(req, res){
  db.all(`SELECT * FROM Contact`, function(err, data){
    res.render('contact', {data_contact: data});
  });
});
//go to form page
app.get('/contact/add', function(req, res){
  res.render('form');
});
//submit data from add page and will going back to contact page
app.post('/contact/add', function(req, res){
  db.run(`INSERT INTO Contact(Name, Company, Telp, Email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp}', '${req.body.email}')`);
  res.redirect('/contact');
})
// go to edit page and only select the data for each id
app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contact WHERE id = '${req.params.id}'`, function(err, result){
    res.render('edit', {data: result});
  });
});
// action or post edit from the form page
app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contact SET Name = '${req.body.Name}', Company = '${req.body.Company}', Telp = '${req.body.Telp}', Email = '${req.body.Email}' WHERE id = ${req.params.id}`);
  res.redirect('/contact');
});
// delete, use app.get for delete, becuse the system only take the data from database and there is no recieving data bro user
app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contact WHERE id = '${req.params.id}'`);
  res.redirect('/contact');
});

//-------------------------------------------
//-----------------GAP-----------------------
//-------------------------------------------

//show group info on group page
app.get('/group', function(req, res){
  db.all('SELECT * FROM ContactGroup', function(err, data){
    res.render('group', {dataGroup: data});
  });
});
//going to group form for add group
app.get('/group/addgroup', function(req, res){
  res.render('groupaddform');
});
//add new group on database
app.post('/group/addgroup', function(req, res){
  db.run(`INSERT INTO ContactGroup(GroupName) VALUES ('${req.body.groupname}')`)
  res.redirect('/group');
})
//go to the group edit form
app.get('/group/edit/:id', function(req, res){
  db.all(`SELECT * FROM ContactGroup WHERE id = '${req.params.id}'`, function(err, result){
    res.render('groupedit', {dataGroup: result});
  });
});
//edit data group from groupeditform
app.post('/group/edit/:id', function(req, res){
  db.run(`UPDATE ContactGroup SET GroupName = '${req.body.groupname}' WHERE id = ${req.params.id}`);
  res.redirect('/group');
})
//delete data from group info interface
app.get('/group/delete/:id', function(req, res){
  db.run(`DELETE FROM ContactGroup WHERE id = ${req.params.id}`);
  res.redirect('/group');
});

//-----------------Profiles------------------//
//-------------------GAP--------------------//
//-----------------Profiles----------------//

//show up profiles page
app.get('/profile', function(req, res){
  db.all('SELECT * FROM Profiles', function(err, data){
    res.render('profile', {dataProfiles: data});
  });
});
//go to form profile
//nampilin dropdown data contact!!
app.get('/profile/add/', function(req, res){
  db.all(`SELECT * FROM Contact;`, function(err, data){
  res.render('profileform', {contactData: data});
  });
});
//submit data profile form
app.post('/profile/add', function(req, res){
  db.run(`INSERT INTO Profiles (Username, Password, Contact_Id) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.contactID}')`);
  res.redirect('/profile');
});
//go to profile edit form page
app.get('/profile/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}'`, function(err, result){
    db.all(`SELECT * FROM Contact;`,  function(err, data){
      res.render('profileedit', {dataProfile: result, dataContact: data});
    });
  });
});
// update profile
app.post('/profile/edit/:id', function(req, res){
  db.run(`UPDATE Profiles SET Username = '${req.body.username}', Password = '${req.body.password}', Contact_Id = '${req.body.contactID}' WHERE id = ${req.params.id} `);
  res.redirect('/profile');
});
//delete
app.get('/profile/delete/:id', function(req, res){
  db.run(`DELETE FROM Profiles WHERE id= ${req.params.id}`);
  res.redirect('/profile');
});
//show profile + contacts detail
app.get('/profile/detail/:id', function(req, res){
  db.all(`SELECT Profiles.id, Profiles.Username, Profiles.Password, Contact.id,
    Contact.Name, Contact.Company, Contact.Telp, Contact.Email
    FROM Profiles JOIN Contact ON Profiles.Contact_Id = Contact.id
    WHERE Profiles.id = ${req.params.id}`, function(err, data){
    res.render('detailprof', {detailProf: data});
    //console.log(data);
  });
});

//---------------Address-------------------//
//-----------------GAP-------------------//
//---------------Address----------------//

//show address page
app.get('/address', function(req, res){
  db.all(`SELECT * FROM Address`, function(err, alamat){
  res.render('address', {dataAddress: alamat});
});
});
// got to form addrees to add it
app.get('/address/add', function(req, res){
  db.all(`SELECT * FROM Contact;`, function(err, data){
    res.render('addressform', {addressData: data});
  });
});
//submit data address form
app.post('/address/add', function(req, res){
  db.run(`INSERT INTO Address (street, city, zipcode, contact_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', ${req.body.contactID})`);
  res.redirect('/address');
})

app.listen(3000);
