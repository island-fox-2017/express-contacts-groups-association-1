`use strict`

class Groups {
  constructor(){

  }

    static findAll(conn, callback) {
      conn.all(`SELECT * FROM Groups`, function(err, rows){
        if(!err){
          callback(false, rows)
        } else {
          callback(true, null)
        }
      })
    }

    static insertData(conn, req) {
      conn.run(`INSERT INTO Groups(name_of_group)
      VALUES ('${req.group}')`)
    }

    static editData(conn, req, callback){
      conn.all(`SELECT * FROM Groups WHERE id = ${req}`,
        function(err, rows){
        if(!err){
          callback(false, rows)
        } else {
          callback(true, null)
        }
      })
    }

    static updateData(conn, req, reqparam){
      conn.run(`UPDATE Groups SET name_of_group = "${req.group}"
      WHERE id = ${reqparam}`)
    }

    static deleteData(conn,req){
      conn.run(`DELETE FROM Groups WHERE id = ${req}`)
    }

}

module.exports = Groups
