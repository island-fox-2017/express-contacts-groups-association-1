class Profiles {
  constructor(file) {
    this.id = file.id;
    this.user = file.username;
    this.age = file.age;
  }

  static showProfiles(conn, callback){
    conn.all(`SELECT * FROM Profiles`, function(err, low){
      if (!err) {
        //callback(false, low)
        conn.all(`SELECT id, name FROM Contacts`, function(err, lower){
          if (!err) {
            callback(false, low, lower)
          }
          else{
            callback(true, null)
          }
        });
      }
      // else{
      //   callback(true, null)
      // }
    });
  };
  //
  static contactDetail(conn, idCont, callback){
    conn.all(`SELECT * FROM Profiles JOIN Contacts ON Profiles.contact_id = Contacts.id WHERE Contacts.id = ${idCont.id}`, function(err, data){
      if(!err){
        callback(false, data)
      }
      else{
        callback(true, null)
      }
    })
  }

  // static insertProfiles(conn, file){
  //   conn.run(`INSERT INTO Profiles(username, age, contact_id) VALUES ('${file.nickname}', '${file.age_profile}', '${file.contact_id}')`);
  // };
  //
  // static editProfiles(conn, idGrup, callback){
  //   conn.all(`SELECT * FROM Groups WHERE id = '${idGrup.id}'`, function(err, result){
  //     if (!err) {
  //       conn.all(`SELECT id, name FROM Contacts`, function (err, result2){
  //         callback(false, result, result2)
  //       });
  //     }
  //     else{
  //       callback(true, null)
  //     }
  //   });
  // };
  //
  // // static updateGroups(conn, file, fileUpdate){
  // //   conn.run(`UPDATE Groups SET name_of_group ='${file.nameGroups}' WHERE id = '${fileUpdate.id}'`);
  // // };
  //
  static deleteProfiles(conn, delProf){
    conn.run(`DELETE FROM Profiles WHERE id = '${delProf.id}'`);
  }


}

module.exports = Profiles;
