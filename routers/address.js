'use strict'

const express = require('sqlite3');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Profile = require('../models/Profiles');
let db = new DbModel('./db/data.db');

// Profile Routing
