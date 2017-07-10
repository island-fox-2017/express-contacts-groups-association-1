const express = require('express');
const app = express();
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
var library = require('./library')//Lib of functions

var db = new sqlite.Database('./db/data.db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine', 'ejs');

//HOMEPAGE
app.get('/', (req, res) => {
   res.render('index');
});

//CONTACTS PAGE
app.get('/contacts', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Contacts;", (err, data) => {
        res.render('contacts', {data_contacts : data});
    });
});

//FORM
app.post('/contacts', (req, res) => {
    library.insertContacts(req.body);

    res.redirect('/contacts');
    });

//EDIT CONTACTS PAGE
app.get('/contacts/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}';`, (err, data) => {
       res.render('edit_contacts', {data_contacts : data});
    });
});

app.post('/contacts/edit/:id', (req, res) => {
    library.editContacts(req.body);

    res.redirect('/contacts');
});

//DELETE CONTACTS
app.get('/contacts/delete/:id', (req, res) => {
    library.removeContacts(req.params.id);

    res.redirect('/contacts');
})

//=======================================================================//

//GROUPS PAGE
app.get('/groups', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Groups;", (err, data) => {
        res.render('groups', {data_contacts : data});
    });
});

//FORM
app.post('/groups', (req, res) => {
    library.insertGroups(req.body);

    res.redirect('/groups');
    });

//EDIT GROUPS PAGE
app.get('/groups/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}';`, (err, data) => {
       res.render('edit_groups', {data_groups : data});
    });
});

app.post('/groups/edit/:id', (req, res) => {
    library.editGroups(req.body);

    res.redirect('/groups');
});

//DELETE GROUPS
app.get('/groups/delete/:id', (req, res) => {
    library.removeGroups(req.params.id);

    res.redirect('/groups');
});

//=======================================================================//

//PROFILES PAGE
app.get('/profiles', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Profiles;", (err, data) => {
        res.render('profiles', {data_profiles : data});
    });
});

//ADD PROFILES
app.get('/profiles/add', (req, res) => {
    db.all("SELECT * FROM Contacts;", (err, data) => {
        res.render('profiles_add', {data_contacts : data});
    });
});

//FORM AT ADD PROFILES
app.post('/profiles/add', (req, res) => {
    library.insertProfiles(req.body);

    res.redirect('/profiles');
    });

//EDIT PROFILES PAGE
app.get('/profiles/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}';`, (err, data_profiles) => {
      db.all(`SELECT * FROM Contacts;`, (err, data_contacts) => {
        res.render('edit_profiles', {data_profiles : data_profiles, data_contacts : data_contacts});
      });
    });
    // db.all(`SELECT  Profiles.id, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Profiles.id = '${req.params.id}';`, (err, data) => {
    //    res.render('edit_profiles', {data_profiles : data});
    // });
});

app.post('/profiles/edit/:id', (req, res) => {
    library.editProfiles(req.body);

    res.redirect('/profiles');
});

//GET CONTACT DETAILS FROM PROFILES
app.get('/profiles/contacts/:id', (req, res) => {
    db.all(`SELECT  Profiles.id, Profiles.username, Profiles.password, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profiles INNER JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Profiles.id = 1;`, (err, data) => {
      res.render('profiles_contact', {data_join : data});
    });
});

//DELETE PROFILES
app.get('/profiles/delete/:id', (req, res) => {
    library.removeProfiles(req.params.id);

    res.redirect('/profiles');
});

//=======================================================================//

//ADDRESSES PAGE
app.get('/addresses', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Addresses;", (err, data) => {
        res.render('addresses', {data_addresses : data});
    });
});

//ADD ADDRESSES
app.get('/addresses/add', (req, res) => {
    db.all("SELECT * FROM Contacts;", (err, data) => {
        res.render('addresses_add', {data_contacts : data});
    });
});

//FORM AT ADD ADDRESSES
app.post('/addresses/add', (req, res) => {
    library.insertAddresses(req.body);

    res.redirect('/profiles');
    });

app.listen(3000);
