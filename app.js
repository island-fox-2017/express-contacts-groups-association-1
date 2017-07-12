const express = require('express')
const app = express()

// const sqlite3 = require ('sqlite3').verbose();
// const db = new sqlite3.Database('./db/data1.db');

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.set('view engine','ejs')

const Contacts = require('./model/contactsORM');
const Db = require('./model/dbModel');
const Groups = require('./model/groupsORM');
const Profiles = require('./model/profilesORM');
const Addresses = require('./model/addressesORM');

var model = new Db();

//ROUTING
var contacts_router = require('./routing/contacts_routing')

app.get('/', function(req, res) {
  res.render('index', {nama:"Halaman Utama"})
})

 //==================================================CONTACT
// app.get('/contact', function(req, res){
//   Contacts.findAll(model.connection,function(err, rows){
//     res.render('contact',{all:rows})
//     })
//   })

app.use('/contact', contacts_router)

app.post('/contact',function(req,res){
  Contacts.insertData(model.connection,req.body)
    res.redirect('/contact')
  })


app.get('/contact/edit/:id', function(req, res){
  Contacts.editData(model.connection,req.params.id,function(err,rows)
  {
      res.render('edit', {all:rows})
    })
  })

app.post('/contact/edit/:id', function(req, res){
  Contacts.updateData(model.connection,req.body,req.params.id)
  res.redirect('/contact')
})

app.get('/contact/delete/:id', function(req, res){
  Contacts.deleteData(model.connection,req.params.id)
  res.redirect('/contact')
})

 //====================================================GROUP


 app.get('/group', function(req, res){
   Groups.findAll(model.connection,function(err, rows){
     res.render('group',{allG:rows})
     })
   })

   app.post('/group',function(req,res){
     Groups.insertData(model.connection,req.body)
       res.redirect('/group')
     })

   app.get('/group/edit/:id', function(req, res){
     Groups.editData(model.connection,req.params.id,function(err,rows){
         res.render('editG', {allG:rows})
       })
     })

  app.post('/group/edit/:id', function(req, res){
    Groups.updateData(model.connection,req.body,req.params.id)
    res.redirect('/group')
  })

  app.get('/group/delete/:id', function(req, res){
    Groups.deleteData(model.connection,req.params.id)
    res.redirect('/group')
  })

//========================================Profile

app.get('/profiles', function(req, res){
  Profiles.findAll(model.connection,function(err, rows1){
    Contacts.findAll(model.connection, function(err, rows2){
      if(!err){
            res.render('profile', {allP:rows1, allC:rows2}) //====
      }
    })
  })
})

app.post('/profiles', function(req, res){
  Profiles.insertData(model.connection,req.body)
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req, res){
  Profiles.editData(model.connection, req.params.id, function(err, rows){
    res.render('editP', {allP:rows})
    })
  })

app.post('/profiles/edit/:id', function(req, res){
  Profiles.updateData(model.connection, req.body, req.params.id)
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function(req, res){
  // console.log('=========================> ', model);
 Profiles.deleteData(model.connection,req.params.id)
 res.redirect('/profiles')
})

//========================================Addresses

app.get('/addresses', function(req, res){
  Addresses.findAll(model.connection,function(err, rows){
    res.render('addresses', {allAdd:rows})
  })
})

app.post('/addresses', function(req, res){
  db.run(`INSERT INTO Addresses(street, city, zip_code, contact_id)
  VALUES('${req.body.street}', '${req.body.city}', '${req.body.zip_code}', '${req.body.contact_id}')`)
  res.redirect('/addresses')
})

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
