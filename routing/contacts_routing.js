var express = require('express')
var router = express.Router()
const Contacts = require('../model/contactsORM');
const Db = require('../model/dbModel');
var model = new Db();

router.get('/', function(req, res){
  Contacts.findAll(model.connection,function(err, rows){
    res.render('contact',{all:rows})
    })
  })

module.exports = router
