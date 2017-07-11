class Contacts_Groups {
  constructor(data) {
    this.id = data.id;
    this.contact_id = data.contact_id;
    this.group_id = data.group_id;
  }

  static showData(conn, callback) {
    conn.all(`SELECT * FROM Contacts_Groups;`, function(err, rows) {
      if(!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  }

  static insertData(conn, obj) {
    conn.run(`
      INSERT INTO Contacts_Groups (contact_id, group_id)
      VALUES ('${obj.contact_id}', '${obj.group_id}');
    `);
  }

  static deleteData(conn, id) {
    conn.run(`DELETE FROM Contacts_Groups WHERE id = ${id};`);
  }
}

module.exports = Contacts_Groups
