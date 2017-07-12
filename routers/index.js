const express = require('express');
const router = express.Router();

const DbModel = require('../models/DbModel');

router.get('/', function(req, res){
  res.render('index');
});

module.exports = router;
