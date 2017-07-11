class Groups {
  constructor(data) {
    this.id = data.id;
    this.name_of_group = data.name_of_group;
  }

  static showData(conn, callback) {
    conn.all(`
      SELECT
        g.*,
        cg.group_id,
        cg.contact_id,
        c.name
      FROM
        Groups AS g
      LEFT JOIN Contacts_Groups AS cg
        ON g.id = cg.group_id
      LEFT JOIN Contacts AS c
        ON c.id = cg.contact_id;
      `, function(err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      });
  }

  static insertData(conn, objSomething) {
    conn.run(`
      INSERT INTO Groups (name_of_group)
      VALUES ('${objSomething.name_of_group}');
    `);
  }

  static deleteData(conn, id) {
    conn.run(`DELETE FROM Groups WHERE id = ${id};`);
  }

  static editData(conn, id, callback) {
    conn.all(`
      SELECT * FROM Groups WHERE id = ${id};
      `, function (err, rows) {
        if (!err) {
          callback(false, rows);
        } else {
          callback(true, null)
        }
      });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Groups
      SET name_of_group = '${obj.name_of_group}'
      WHERE id = ${obj.id};
    `);
  }
}

module.exports = Groups
