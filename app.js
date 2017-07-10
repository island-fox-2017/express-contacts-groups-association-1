var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var app = express();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))



//================PROFILE================
app.get("/home", function(req, res) {
  res.render("index")
})
app.get("/", function(req, res) {
  res.redirect("/home")
})

app.get("/home/profile", function(req, res) {
  db.all(`SELECT * FROM Data_Profile`, function(err, db_Profile) {
    res.render("profile", {data_pro : db_Profile})
  })
})

//add
app.get("/home/profile/add", function(req, res) {
  db.all(`SELECT * FROM Data_Contact`, function(err, db_Contact) {
    res.render("form-profile", {data_Con : db_Contact})
  })
})
app.post("/home/profile/add", function(req, res) {
  db.run(`INSERT INTO Data_Profile(username, password, contact_id) VALUES
     ("${req.body.username}","${req.body.password}","${req.body.contact_id}")`)
     res.redirect("/home/profile")
})

//edit
app.get("/home/profile/edit/:id",function(req, res) {
  db.all(`SELECT * FROM Data_Profile WHERE id = "${req.params.id}"`, function(err, db_Profile) {
    db.all(`SELECT * FROM Data_Contact`,function(err, db_Contact) {
      res.render("edit-profile", {data_pro : db_Profile, data_Con : db_Contact})
    })
  })
})
app.post("/home/profile/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Profile SET username = "${req.body.username}", password = "${req.body.password}", contact_id = "${req.body.contact_id}" WHERE id = "${req.params.id}"`)
     res.redirect("/home/profile")
})
//Detail
app.get("/home/profile/contacts/:id", function(req, res) {
  db.all(`SELECT Data_Profile.id, Data_Profile.username,
    Data_Profile.password, Data_Contact.name, Data_Contact.company,
    Data_Contact.telp_number, Data_Contact.email FROM Data_Profile
    JOIN Data_Contact ON Data_Profile.contact_id = Data_Contact.id
    WHERE Data_Profile.contact_id = ${req.params.id}`, function(err, db_Contact) {
    res.render("detail", {data_cont : db_Contact});
    console.log(db_Contact);
  })
})

//hapus
app.get("/home/profile/delete/:id",function(req, res) {
  db.run(`DELETE FROM Data_Profile WHERE id = "${req.params.id}"` )
  res.redirect("/home/profile")
})
//================Kontak=================

// app.get("/home/contacts", function(req, res) {
//   db.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES("ganang", "hacktiv", "085372281600", "gananggww@gmail.com")`)
// })

//display all contact list
app.get("/home/profile/contacts/", function(req, res) {
  db.all(`SELECT * FROM Data_Contact`, function(err, db_Contact) {
    res.render("contacts", {data : db_Contact})
  })
})

//display form isi Kontak
app.get("/home/profile/contacts/add", function(req, res) {
  res.render("form-contact")
})

//insert ke database
app.post("/home/profile/contacts/add", function(req, res) {
  db.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES
  ("${req.body.name}","${req.body.company}","${req.body.telp})","${req.body.email}")`)
  res.redirect("/home/profile/contacts")
})

//display database
app.get("/home/profile/contacts/edit/:id",function(req, res) {
  db.all(`SELECT * FROM Data_Contact WHERE id = "${req.params.id}"`, function(err, db_Contact) {
    res.render("edit-contact", {data : db_Contact})
  })
})
//insert hasil edit database
app.post("/home/profile/contacts/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Contact SET name = "${req.body.name}", company = "${req.body.company}", telp_number = "${req.body.telp}", email = "${req.body.email}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/profile/contacts")
})
//delete record
app.get("/home/profile/contacts/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Contact WHERE id = "${req.params.id}"`)
  res.redirect("/home/profile/contacts")
})
//====================================

app.listen(3030)
