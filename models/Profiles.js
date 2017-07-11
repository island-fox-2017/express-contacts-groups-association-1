class Profiles {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.contact_id = data.contact_id;
  }

  static showData(conn, callback) {

  }

  static insertData(conn, obj) {
    conn.run(`
      INSERT INTO Profiles (username, password, contact_id)
      VALUES ('${obj.username}', '${obj.password}', '${obj.contact_id}'
      );
    `);
  }

  static deleteData(conn, id) {
    conn.run(`DELETE FROM Profiles WHERE id = ${id};`);
  }

  static editData(conn, id, callback) {
    conn.all(`SELECT * FROM Profiles WHERE id = ${id};`, function(err, rows) {
      if(!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Profiles
      SET username = '${obj.username}', password = '${obj.password}', contact_id='${obj.contact_id}'
      WHERE id = ${obj.id};
    `);
  }

  static showProfileForContact(conn, id, callback) {
    conn.all(`
      SELECT
        Contacts.*,
        Profiles.username,
        Profiles.password
      FROM
        Contacts
      LEFT JOIN Profiles ON
        Contacts.id = Profiles.contact_id
      WHERE
        Contacts.id = ${id};
      `, function (err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      });
  }
}

module.exports = Profiles
