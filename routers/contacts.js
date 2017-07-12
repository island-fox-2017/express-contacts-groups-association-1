const express = require('express');
const router = express.Router();

const DbModel = require('./models/DbModel');
const Contact = require('./models/contact');

let dbModel = new DbModel('db/database.db');

router.get('/', function(req, res){
  Contact.showContact(dbModel.connection, function(err, rows){
    // console.log(rows);
    res.render('contacts', {data: rows});
  });
});

router.get('/insert_data', function(req, res){
  res.render('contacts');
});

router.post('/insert_data', function(req, res){
Contact.insertContact(dbModel.connection, req.body);
  res.redirect('/contacts');
});

router.get('/edit/:id', function(req, res){
  Contact.editContact(dbModel.connection, req.params.id, function(err, ris){
      res.render('edit', {edit_data: ris});
  });
});

router.post('/edit/:id', function(req, res){
  Contact.updateContact(dbModel.connection, req.body, req.params);
  res.redirect('/contacts');
});

router.get('/delete/:id', function (req, res) {
  Contact.deleteContact(dbModel.connection, req.params);
    res.redirect('/contacts');
});


module.exports = router;
