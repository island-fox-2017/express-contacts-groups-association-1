class Addresses {
  constructor(data) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zip_code = data.zip_code;
    this.contact_id = data.contact_id;
  }

  static showAll(conn, callback) {
    conn.all(`SELECT * FROM Address`, function(err, rows) {
      if(!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  }

  static showData(conn, callback) {
    conn
  }

  static insertData(conn, obj) {
    conn.run(`
      INSERT INTO Address (street, city, zip_code, contact_id)
      VALUES ('${obj.street}', '${obj.city}', '${obj.zip_code}', '${obj.contact_id}');
      `);
  }

  static deleteData(conn, id) {
    conn.run(`DELETE FROM Address WHERE id = ${id};`);
  }

  static editData(conn, id, callback) {
    conn.all(`SELECT * FROM Address WHERE id = ${id};`, function(err, rows) {
      if(!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    });
  }

  static updateData(conn, obj) {
    conn.run(`
      UPDATE Address
      SET street = '${obj.street}', city = '${obj.city}', zip_code = '${obj.zip_code}', contact_id = '${obj.contact_id}'
      WHERE id = ${obj.id};
    `);
  }

  static showAddressForContact(conn, id, callback) {
    conn.all(`
      SELECT
        Contacts.*,
        Address.street, Address.city, Address.zip_code
      FROM
        Contacts
      JOIN Address ON
        Contacts.id = Address.contact_id
      WHERE
        Address.contact_id = ${id};
      `, function(err, rows) {
        if(!err) {
          callback(false, rows);
        } else {
          callback(true, null);
        }
    });
  }
}

module.exports = Addresses
