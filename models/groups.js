class Groups {
  constructor(file) {
    this.id = file.id;
    this.name = file.name_of_group;
  }

  static showGroups(conn, callback){
    conn.all(`SELECT * FROM Groups`, function(err, rows){
      if (!err) {
        callback(false, rows)
      } else{
        callback(true, null)
      }
    });
  };

  static insertGroups(conn, file){
    conn.run(`INSERT INTO Groups(name_of_group) VALUES ('${file.nameGroups}')`);
  };

  static editGroups(conn, idGrup, callback){
    conn.all(`SELECT * FROM Groups WHERE id = '${idGrup.id}'`, function(err, rus){
      if (!err) {
        callback(false, rus)
      }
      else{
        callback(true, null)
      }
    });
  };

  static updateGroups(conn, file, fileUpdate){
    conn.run(`UPDATE Groups SET name_of_group ='${file.nameGroups}' WHERE id = '${fileUpdate.id}'`);
  };

  static deleteGroups(conn, delGrup){
    conn.run(`DELETE FROM Groups WHERE id = '${delGrup.id}'`);
  }


}

module.exports = Groups;
