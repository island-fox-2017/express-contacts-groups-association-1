let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

function burnThemAll() {
  db.run(`DROP TABLE Profiles`);
  //db.run(`DROP TABLE Groups`);
  //db.run(`DROP TABLE Contacts`);
  console.log('Deleted!');
}

//burnThemAll();
