var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
function createTable() {
  db.run(`CREATE TABLE Students
           (id int, firstName text, lastName text, email text);`);
  console.log("Table created");
}
function insertData() {
  //INSERT INTO NAMA_TABLE (nama_column1, column2) VALUES(value1, value2)
  db.run(`INSERT INTO Students (id, firstName, lastName, email)
  VALUES (2, 'Try', 'Anto', 'anto@gmail.com');`)
  console.log('Data created');
}
//
// function updateData() {
//   //UPDATE NAMA_TABLE SET column_yangingindiubah WHERE condition
//   UPDATE Students SET lastName = 'End', email =  WHERE id = 3;
// }
//
// function deleteData() {
//   //DELETE FROM NAMA_TABLE WHERE condition
//   DELETE FROM Students WHERE id = 3;
// }
//
function showData() {
  db.all(`SELECT firstName FROM Students`, function(err, rows) {
    if(!err) {
      // rows.forEach(row => {
      //   console.log(`${row.firstName} ${row.email}`);
      // })
    }
  })
}
//createTable()
//insertData()
showData()