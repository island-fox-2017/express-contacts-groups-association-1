class Contact{
  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.telp = data.telp_number;
    this.email = data.email;
  }

  static showContact(conn, callback){
    conn.all(`SELECT * FROM Contacts`, function(err, rows){
      if(!err){
        callback(false, rows)
      }
      else{
        callback(true, null)
      }
    });
  };

  static insertContact(conn, data){
    conn.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES('${data.ownerName}', '${data.company}','${data.telpComp}', '${data.emailCompany}')`);
  };

  static editContact(conn, id, callback){
    conn.all(`SELECT * FROM Contacts WHERE id = '${id}'`, function(err, ris){
    if(!err){
      callback(false, ris)
    } else{
      callback(true, null)
    }
    });
  };

  static updateContact(conn, data, dataUpdate){
    conn.run(`UPDATE Contacts SET name ='${data.ownerName}', company ='${data.company}', telp_number ='${data.telpComp}', email ='${data.emailCompany}' WHERE id= '${dataUpdate.id}' `);
  };

  static deleteContact(conn, reqi){
    conn.run(`DELETE FROM Contacts WHERE id = '${reqi.id}'`);
  }

}



module.exports = Contact;
