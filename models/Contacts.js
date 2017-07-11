class Contacts {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
    this.group_joined = data.group_joined
  }

  static showAll(conn, callback) {
    conn.all(`SELECT * FROM Contacts`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null);
      }
    });
  }

  static showData(conn, callback) {
    conn.all(`
      SELECT
        *
      FROM
        Groups AS g
      JOIN Contacts_Groups AS cg
        ON g.id = cg.group_id
      JOIN Contacts AS c
        ON c.id = cg.contact_id
      ;
      `, function(err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      })
  }

  // static showContact(conn, callback) {
  //   conn.all(`
  //     SELECT * FROM Contacts;
  //     `, function(err, rows) {
  //       if(!err) {
  //         db.all(`
  //           SELECT
  //             *
  //           FROM
  //             Groups AS g
  //           JOIN Contacts_Groups AS cg
  //             ON g.id = cg.group_id
  //           JOIN Contacts AS c
  //             ON c.id = cg.contact_id
  //           ;.
  //           `, function(err, rows2) {
  //             if(!err) {
  //               callback(rows, rows2);
  //             }
  //           });
  //
  //       }
  //     };
  // }


  static showContactPromise() {
    return new Promise(function(fulfill, reject) {
      conn.all(`SELECT * FROM Contacts`, function(err, rows) {
        if(err) {
          reject();
        } else {
          fulfill(rows);
        }
      });
    })
  }

  static showContactPromise2() {
    return new Promise(function(fulfill, reject) {
      conn.all(`SELECT
                   *
                 FROM
                   Groups AS g
                 JOIN Contacts_Groups AS cg
                   ON g.id = cg.group_id
                 JOIN Contacts AS c
                   ON c.id = cg.contact_id;`, function(err, rows) {
         if(err) {
           reject();
         } else {
           fulfill(rows);
         }
      });
    });
  }

  static callContactPromise() {
    Contacts.showContactPromise()
    .then(function(data_contact) {
      return [data_contact, Contacts.showContactPromise2()];
    })
  }

/*
  static callContactPromise() {
    Contact.showContactPromise()
    .then(data_contact) {
      return (data_contact, Contact.showQueryPromise2())
    }
    .spread(data_contact, datakedua) {
      return [data_contact, datakedua]
    }
    .catch() {
      return "hiks error"
    }
  }
*/
  static insertData(conn, objSomething) {
    conn.run(`
      INSERT INTO Contacts (name, company, telp_number, email)
      VALUES ('${objSomething.name}', '${objSomething.company}', '${objSomething.telp_number}', '${objSomething.email}');
    `);
  }

  static deleteData(conn, id) {
    conn.run(`
      DELETE FROM Contacts WHERE id = ${id};
    `);
  }

  static editData(conn, id, callback) {
    conn.all(`
      SELECT * FROM Contacts WHERE id = ${id};
      `, function (err, rows) {
        if (!err) {
          callback(false, rows);
        } else {
          callback(true, null);
        }
      });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Contacts
      SET name = '${obj.name}', company = '${obj.company}', telp_number = '${obj.telp_number}', email = '${obj.email}'
      WHERE id = ${obj.id};
    `);
  }
}

module.exports = Contacts
