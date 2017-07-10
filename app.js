//ini adalah cara require express nya
var express = require('express')
//butuh SQLITE3
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db')
//biar bisa akses folder project
var path = require('path');
//pakai body parser
const bodyParser = require('body-parser');


//ini cara intiate-nya
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//ini untuk setup view engine
app.set('view engine', 'ejs');

//panggil data

//ini untuk setup public folder
var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);


app.get('/', function(req, res){
  res.render('index')
  // res.send('Achim Baggins')
})

//createTable
app.get('/create-table/contact', function (req, res) {
  db.run('CREATE TABLE if not exists CONTACT2017 (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, phone INTEGER, email text)');
  res.send('contact table created')
})
app.get('/create-table/group', function (req, res) {
  db.run('CREATE TABLE if not exists GROUPS (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name text)');
  res.send('group table created')
})


//insert dummy record
app.get('/insert/data/contact', function(req, res){
  db.run("INSERT INTO CONTACT2017 (name, company, phone, email) VALUES ('Achim Baggins', 'Hacktiv8 Indonesia', 081803704343, 'achim_baggins@yahoo.com')");  // res.send('Achim Baggins')
  res.redirect('/contacts')
})
app.get('/insert/data/group', function(req, res){
  db.run("INSERT INTO groups (group_name) VALUES ('Family')");  // res.send('Achim Baggins')
  res.redirect('/groups')
})



//contacts routing
app.get('/contacts', function(req, res){
  db.all("select * FROM CONTACT2017",function (err, data) {
    res.render('contacts',{contacts_list: data})
    // console.log(data.length);
  });
})

app.get('/contacts/add', function(req, res){
  res.render('contacts_add')//,{contacts_list: data})
})

app.post('/contacts/add', function (req, res) {
  // console.log('ok post aktif');

  db.run(`INSERT INTO CONTACT2017 (name, company, phone, email) VALUES ('${req.body.fullname}', '${req.body.company}', '${req.body.phone}', '${req.body.email}')`);  // res.send('Achim Baggins')
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  // console.log(req.params.id);
  db.all(`select * FROM CONTACT2017 where id=${req.params.id}`,function (err, data) {
    res.render('contacts_edit',{contacts_list: data})
  });
})

app.post('/contacts/edit/:id', function (req, res) {
  db.run(`UPDATE CONTACT2017 SET name='${req.body.name}', company='${req.body.company}', phone='${req.body.phone}', email='${req.body.email}' WHERE id='${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function (req, res) {
  // console.log(req.params.id);
  db.run(`delete from CONTACT2017 where id=${req.params.id};`);
  res.redirect('/contacts')
  // res.send(`ok berhasil hapus ${req.params.id}`)
})

//groups routing
app.get('/groups', function(req, res){
  db.all("select * FROM GROUPS",function (err, data) {
    res.render('groups',{groups_list: data})
    // console.log(data.length);
  });
})

app.post('/groups', function (req, res) {
  // console.log('ok post aktif');
  db.run(`INSERT INTO GROUPS (group_name) VALUES ('${req.body.group_name}')`);  // res.send('Achim Baggins')
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  // console.log(req.params.id);
  db.all(`select * FROM GROUPS where id=${req.params.id}`,function (err, data) {
    res.render('groups_edit',{groups_list: data})
  });
})

app.post('/groups/edit/:id', function (req, res) {
  db.run(`UPDATE GROUPS SET group_name='${req.body.group_name}' WHERE id='${req.params.id}'`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function (req, res) {
  // console.log(req.params.id);
  db.run(`delete from GROUPS where id=${req.params.id};`);
  res.redirect('/groups')
  // res.send(`ok berhasil hapus ${req.params.id}`)
})

app.get('/profile', function (req, res) {
  db.all(`select * from PROFILE`, function (err, data) {
    res.render('profile', {profile_list: data})
  });
})
app.get('/profile/add', function(req, res){
  db.all(`select * from CONTACT2017`, function (err, data) {
    res.render('profile_add', {contacts_list: data})
  });
})

app.post('/profile/add', function (req, res) {
  // console.log(req.body.contact_id);
  db.run(`INSERT INTO PROFILE (username, pass, contact_id) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.contact_id}')`);  // res.,,,send('Achim Baggins')
  res.redirect('/profile')
})

app.get('/profile/:id/contact_detail', function (req, res) {
  db.all(`SELECT * from PROFILE LEFT JOIN CONTACT2017 ON PROFILE.contact_id = CONTACT2017.id where contact_id=${req.params.id}`, function (err,data) {
    console.log(data);
  res.render('detail', {detail_profile: data})
  });

})

app.get('/profile/:id/delete', function (req, res) {
  // console.log(req.params.id);
  db.run(`delete from PROFILE  where id=${req.params.id};`);
  res.redirect('/profile')
  // res.send(`ok berhasil hapus ${req.params.id}`)
})


app.get('/profile/:id/edit', function(req, res){
  db.all(`select * from PROFILE where id=${req.params.id}`,function (err, data) {
    console.log(data);
  res.render('profile_edit',{edit: data})
  });
})
app.post('/profile/:id/edit', function (req, res) {
  db.run(`UPDATE PROFILE SET pass='${req.body.password}' firstname='${req.body.firstname}' lastname='${req.body.lastname}' WHERE id='${req.params.id}'`)
  res.redirect('/profile')
})

app.get('/addresses', function (req, res) {
  db.all(`select * from ADDRESS`, function (err, data) {
    res.render('address', {address: data})
  })
})

app.get('/addresses/add', function (req, res) {
  db.all(`select * from CONTACT2017`, function (err, data) {
    res.render('address_add', {contacts_list: data})
  });
})

app.post('/addresses/add', function (req, res) {
  // console.log(req.body.contact_id);
  db.run(`INSERT INTO ADDRESS (street, city, zip_code, contact_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zip_code}', '${req.body.contact_id}')`);  // res.,,,send('Achim Baggins')
  res.redirect('/addresses')
})

app.get('/addresses/:id/delete', function (req, res) {
  // console.log(req.params.id);
  db.run(`delete from ADDRESS  where id=${req.params.id};`);
  res.redirect('/addresses')
  // res.send(`ok berhasil hapus ${req.params.id}`)
})

app.get('/addresses/:id/edit', function(req, res){
  db.all(`select * from ADDRESS where id=${req.params.id}`,function (err, data) {
    console.log(data);
  res.render('addresses_edit',{edit: data})
  });
})

app.post('/addresses/:id/edit', function (req, res) {
  // console.log(`UPDATE ADDRESS SET street='${req.body.street}', city='${req.body.city}', zip_code=${req.body.zip_code} WHERE id=${req.params.id}`);
  db.run(`UPDATE ADDRESS SET street='${req.body.street}', city='${req.body.city}', zip_code=${req.body.zip_code} WHERE id=${req.params.id}`);
  res.redirect('/addresses')
})

app.get('/contacts/show-address/:id', function (req, res) {
  // db.all(`SELECT * from ADDRESS LEFT JOIN CONTACT2017 ON ADDRESS.contact_id = CONTACT2017.id where contact_id=${req.params.id}`, function (err, data) {
    db.all(`SELECT * from ADDRESS INNER JOIN CONTACT2017 ON ADDRESS.contact_id = CONTACT2017.id INNER JOIN PROFILE ON PROFILE.contact_id = CONTACT2017.id where PROFILE.contact_id=${req.params.id}`, function (err, data) {
    res.render('show_address', {show: data})
  })
})
app.listen(3000)
