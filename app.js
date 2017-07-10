const express = require('express')
const app = express()

const sqlite3 = require ('sqlite3').verbose();
const db = new sqlite3.Database('./db/data1.db');
const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.set('view engine','ejs')


app.get('/', function(req, res) {
  res.render('index', {nama:"Halaman Utama"})
})

 //===========================================================CONTACT
app.get('/contact', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows){
    res.render('contact', {all:rows})
    })
  })

app.post('/contact',function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telepon_number}', '${req.body.email}')`)
  res.redirect('/contact')
})

app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id} `, function(err, rows){///<===all back==
    res.render('edit', {all:rows})
    })
  })

app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contacts set name ='${req.body.name}',company = '${req.body.company}',
  telp_number = '${req.body.telepon_number}', email = '${req.body.email}' WHERE id =${req.params.id}`)
  res.redirect('/contact')
})

app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect('/contact')
})

 //=======================================================GROUP
 app.get('/group', function(req, res){
   db.all(`SELECT * FROM Groups`, function(err, rows){
     res.render('group', {allG:rows})
     })
   })

  app.post('/group',function(req, res){
    db.run(`INSERT INTO Groups(name_of_group)
    VALUES ('${req.body.group}')`)
    res.redirect('/group')
   })

   app.get('/group/edit/:id', function(req, res){
     db.all(`SELECT * FROM Groups WHERE id = ${req.params.id} `, function(err, rows){
       res.render('editG', {allG:rows})
       })
     })

  app.post('/group/editG/:id', function(req, res){
    db.run(`UPDATE Groups SET name_of_group = "${req.body.group}" WHERE id = ${req.params.id}`)
    res.redirect('/group')
  })

  app.get('/group/deleteG/:id', function(req, res){
    db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
    res.redirect('/group')
  })

//========================================Profile

app.get('/profiles', function(req, res){
  db.all(`SELECT Profiles.id, Profiles.username, Profiles.facebook_username,
    Profiles.google_username, Profiles.contact_id, Contacts.name, Contacts.company,
    Contacts.email FROM Profiles JOIN Contacts ON contact_id = Contacts.id`, function(err, rows1){
    db.all(`SELECT * FROM Contacts`, function(err, rows2){
      if(!err){
            res.render('profile', {allP:rows1, allC:rows2}) //====
      }
    })
  })
})

app.post('/profiles', function(req, res){
  db.run(`INSERT INTO Profiles(username, facebook_username, google_username, contact_id)
  VALUES('${req.body.username}', '${req.body.facebook_username}', '${req.body.google_username}', '${req.body.inputId}')`)
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id} `, function(err, rows){
    res.render('editP', {allP:rows})
    })
  })

// app.post('/group/editG/:id', function(req, res){
//  db.run(`UPDATE Groups SET name_of_group = "${req.body.group}" WHERE id = ${req.params.id}`)
//  res.redirect('/group')
// })
//
app.get('/profiles/delete/:id', function(req, res){
 db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
 res.redirect('/profiles')
})

//========================================Addresses

app.get('/addresses', function(req, res){
  db.all(`SELECT * FROM Addresses`, function(err, rows){
    res.render('addresses', {allAdd:rows})
  })
})

app.post('/addresses', function(req, res){
  db.run(`INSERT INTO Addresses(street, city, zip_code, contact_id)
  VALUES('${req.body.street}', '${req.body.city}', '${req.body.zip_code}', '${req.body.contact_id}')`)
  res.redirect('/addresses')
})
//
// app.get('/profiles/edit/:id', function(req, res){
//   db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id} `, function(err, rows){
//     res.render('editP', {allP:rows})
//     })
//   })

// app.post('/group/editG/:id', function(req, res){
//  db.run(`UPDATE Groups SET name_of_group = "${req.body.group}" WHERE id = ${req.params.id}`)
//  res.redirect('/group')
// })
//
// app.get('/profiles/delete/:id', function(req, res){
//  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
//  res.redirect('/profiles')
// })



app.listen(3007)
