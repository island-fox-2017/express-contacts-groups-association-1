'use strict'

class Addresses {
  constructor() {

  }
  static findAll(conn, callback) {
    conn.all(`SELECT * FROM Profiles`, function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static insertData(conn, req) {
    conn.run(`INSERT INTO Profiles(name, company, telp_number, email)
    VALUES ('${req.name}', '${req.company}', '${req.telepon_number}',
    '${req.email}')`)
  }

  static editData(conn, req, callback){
    conn.all(`SELECT * FROM Profiles WHERE id = ${req}`,
      function(err, rows){
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static updateData(conn, req, reqparam){
    conn.run(`UPDATE Profiles set name ='${req.name}',company = '${req.company}',
    telp_number = '${req.telepon_number}', email = '${req.email}' WHERE id =${reqparam}`)
  }

  static deleteData(conn,req){
    conn.run(`DELETE FROM Profiles WHERE id = ${req}`)
  }


}

module.exports = Addresses
