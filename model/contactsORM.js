`use strict`

class Contacts {
  constructor(){

  }

    static findAll(conn, callback) {
      conn.all(`SELECT * FROM Contacts`, function(err, rows){
        if(!err){
          callback(false, rows)
        } else {
          callback(true, null)
        }
      })
    }

    static insertData(conn, req) {
      conn.run(`INSERT INTO Contacts(name, company, telp_number, email)
      VALUES ('${req.name}', '${req.company}', '${req.telepon_number}',
      '${req.email}')`)
    }

    static editData(conn, req, callback){
      conn.all(`SELECT * FROM Contacts WHERE id = ${req}`,
        function(err, rows){
        if(!err){
          callback(false, rows)
        } else {
          callback(true, null)
        }
      })
    }

    static updateData(conn, req, reqparam){
      conn.run(`UPDATE Contacts set name ='${req.name}',company = '${req.company}',
      telp_number = '${req.telepon_number}', email = '${req.email}' WHERE id =${reqparam}`)
    }

    static deleteData(conn,req){
      conn.run(`DELETE FROM Contacts WHERE id = ${req}`)
    }

}

module.exports = Contacts




//
// app.get('/contact/edit/:id', function(req, res){
//   db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id} `, function(err, rows){///<===all back==
//     res.render('edit', {all:rows})
//     })
//   })
//
// app.post('/contact/edit/:id', function(req, res){
//   db.run(`UPDATE Contacts set name ='${req.body.name}',company = '${req.body.company}',
//   telp_number = '${req.body.telepon_number}', email = '${req.body.email}' WHERE id =${req.params.id}`)
//   res.redirect('/contact')
// })
//
// app.get('/contact/delete/:id', function(req, res){
//   db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
//   res.redirect('/contact')
// })
