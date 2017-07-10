const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

var setupDB = require('./setup');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var path_name = path.join(__dirname, 'public');
var express_static = express.static(path_name);

//to create contact's table
app.get('/setupdb', function(req, res){
  setupDB();
  res.send('Database Table Created!!');
});

//the home page
app.get('/home', function(req, res){
  res.render('home');
});
//the contact page
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
// go to edit page
app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contact WHERE id = '${req.params.id}'`, function(err, result){
    res.render('edit', {data: result});
  });
});
// post edit from the form page
app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contact SET Name = '${req.body.Name}', Company = '${req.body.Company}', Telp = '${req.body.Telp}', Email = '${req.body.Email}' WHERE id = ${req.params.id}`);
  res.redirect('/contact');
});
// delete data
app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contact WHERE id = '${req.params.id}'`);
  res.redirect('/contact');
});

//show group info on group page
app.get('/group', function(req, res){
  db.all('SELECT  * FROM ContactGroup JOIN CG ON ContactGroup.id  = CG.GroupID JOIN Contact ON CG.ContactID  = Contact.id', function(err, data){
    res.render('group', {dataGroup: data});
  });
});


// CG
app.get('/contactandgroup', function(req, res){
  db.all('SELECT * FROM CG', function(err, data){
    if (!err) {
      db.all(`SELECT * FROM Contact`, function (err, data2){
        if (!err) {
          db.all(`SELECT * FROM ContactGroup`, function (err, data3){
            res.render('cg', {dataCG: data, dataCont: data2, dataGroup: data3});
  })
}
})
}
});
});

app.post('/contactandgroup', function(req, res){
    db.run(`INSERT INTO CG(ContactID, GroupID) VALUES ('${req.body.ContactID}', '${req.body.GroupID}')`);
    res.redirect('/contactandgroup');
});


//go to group form to add group
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
})
// go to Profile page
app.get('/profile', function(req, res){
  db.all('SELECT * FROM Profile', function(err, data){
    if (!err) {
      db.all(`SELECT id, Name FROM Contact`, function (err, data2){
        res.render('profile', {dataProfile: data, dataCont: data2});
      })
    }
  });
});

app.get('/profile/contact/:id', function(req, res){
  db.all(`SELECT * FROM Profile JOIN Contact ON Profile.Contact_id = Contact.id WHERE Contact.id = ${req.params.id}`, function(err, data){
    res.render('profileContact', {dataProfCont: data});
  });
});

app.get('/contact/address/:id', function(req, res){
  db.all(`SELECT * FROM Contact JOIN Address ON Address.Contact_id = Contact.id WHERE Contact.id = ${req.params.id}`, function(err, data){
    res.render('contactAdd', {dataAdd: data});
  });
});

// submitted data of profile and go back to profile to show all the data
app.post('/profile', function(req, res){
    db.run(`INSERT INTO Profile(Username, Password, Contact_id) VALUES ('${req.body.Username}', '${req.body.Password}', '${req.body.Contact_id}')`);
    res.redirect('/profile');
});

app.get('/profile/delete/:id', function(req, res){
  db.run(`DELETE FROM Profile WHERE id = ${req.params.id}`);
  res.redirect('/profile');
})

app.get('/profile/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profile WHERE id = '${req.params.id}'`, function(err, result){
    if (!err) {
  db.all(`SELECT id, Name FROM Contact`, function (err, result2){
  res.render('profileedit', {dataProfile: result, dataCon: result2});
})
}
});
});

app.post('/profile/edit/:id', function(req, res){
  db.run(`UPDATE Profile SET Username = '${req.body.UsernameEjs}', Password = '${req.body.PasswordEjs}', Contact_id = '${req.body.Contact_idEjs}' WHERE id = ${req.params.id}`);
  res.redirect('/profile');
})

app.get('/address', function(req, res){
  db.all('SELECT * FROM Address', function(err, data){
    if (!err) {
      db.all(`SELECT id, Name FROM Contact`, function (err, data2){
      res.render('address', {dataAdd: data, dataCon: data2});
    })
  }
});
});

app.post('/address', function(req, res){
    db.run(`INSERT INTO Address(Street, City, ZIPcode, Contact_id) VALUES ('${req.body.Street}', '${req.body.City}', '${req.body.ZIPcode}', '${req.body.Contact_id}')`);
    res.redirect('/address');
});

app.get('/address/delete/:id', function(req, res){
  db.run(`DELETE FROM Address WHERE id = ${req.params.id}`);
  res.redirect('/address');
})

app.get('/address/edit/:id', function(req, res){
  db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err, result){
if (!err) {
db.all(`SELECT id, Name FROM Contact`, function (err, result2){
res.render('addressedit', {dataAdd: result, dataCon: result2});
})
}
});
});

app.post('/address/edit/:id', function(req, res){
  db.run(`UPDATE Address SET Street = '${req.body.StreetEjs}', City = '${req.body.CityEjs}', ZIPcode = '${req.body.ZIPcodeEjs}', Contact_id = '${req.body.Contact_idEjs}' WHERE id = ${req.params.id}`);
  res.redirect('/address');
})

// relational




app.listen(3000);
