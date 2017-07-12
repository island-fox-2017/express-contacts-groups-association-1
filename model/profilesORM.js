`use strict`

class Profiles {
  constructor(){

  }
    static findAll(conn, callback) {
      conn.all(`SELECT Profiles.id, Profiles.username, Profiles.facebook_username,
        Profiles.google_username, Profiles.contact_id, Contacts.name, Contacts.company,
        Contacts.email FROM Profiles JOIN Contacts ON contact_id = Contacts.id`, function(err, rows){
        if(!err){
          callback(false, rows)
        } else {
          callback(true, null)
        }
      })
    }

    static insertData(conn, req) {
      conn.run(`INSERT INTO Profiles(username, facebook_username, google_username, contact_id)
      VALUES('${req.username}', '${req.facebook_username}',
      '${req.google_username}', '${req.inputId}')`)
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
      conn.run(`UPDATE Profiles set username ='${req.username}',facebook_username = '${req.facebook_username}',
      google_username = '${req.google_username}', contact_id = '${req.contact_id}' WHERE id =${reqparam}`)
    }

    static deleteData(conn,req){
      // console.log(conn);
      conn.run(`DELETE FROM Profiles WHERE id = ${req}`)
    }

    // static removeData(conn, id) {
    //   console.log(conn);
    //   conn.run(`DELETE FROM Profiles Where id = ${id}`)
    // }

}

module.exports = Profiles
