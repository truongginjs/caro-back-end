var { createConnection } = require("mysql");

var createCon = () => {
  return createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "QOLZ6fWybs",
    password: "Gl5qSUAeIU",
    database: "QOLZ6fWybs"
  });
};

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createCon();
      connection.connect();
      connection.query(sql, (error, results) => {
        if (error) reject(error);
        else resolve(results.rows);
        // console.log(results.rows);
        connection.end();
      });
    });
  },
  add: (table, object) => {
    var sql = `insert into ${table} `;
    var cols = "(";
    var xamxam = "(";
    Object.keys(object).forEach((key, i) => {
      cols += ` ${key},`;
      xamxam += ` $${i + 1},`;
    });
    sql += cols;
    sql = sql.substr(0, sql.length - 1);
    sql += ") values ";
    sql += xamxam;
    sql = sql.substr(0, sql.length - 1);
    sql += ")";
    // console.log(sql);
    var values = Object.keys(object).map(key => {
      return object[key];
    });
    // console.log(values);

    var connection = createCon();
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) reject(error);
        else resolve(results);
        // console.log(results);
        connection.end();
      });
    });
  },
  update: (table, object) => {
    var sql = `update ${table} set`;
    Object.keys(object).forEach((key, i) => {
      sql += ` ${key} = $${i + 1},`;
    });
    sql = sql.substr(0, sql.length - 1);
    sql += ` where id = ${object.id}`;
    console.log(sql);
    var values = Object.keys(object).map(key => {
      return object[key];
    });

    console.log(values);
    var connection = createCon();
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) reject(error);
        else resolve(results);
        // console.log(results);
        connection.end();
      });
    });
  },
  deletes: (table, entity) => {
    var sql = `DELETE FROM ${table} WHERE `;
    Object.keys(entity).forEach((key, i) => {
      sql += ` ${key} = $${i + 1} and`;
    });
    sql = sql.substr(0, sql.length - 4);
    // console.log("------------------------------------------------");
    // console.log(sql);
    var values = Object.keys(entity).map(key => {
      return entity[key];
    });
    // console.log("------------------------------------------------");
    // console.log(values);
    var connection = createCon();
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql,values, (err, value) => {

        if (err) reject(err);
        else resolve(value);
        connection.end();
      });
    });
  },
  delete: (table, field, id) => {
    var sql = `DELETE FROM ${table} WHERE ${field}=${id}`;

    var connection = createCon();
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, value) => {
        if (err) reject(err);
        else resolve(value.affectedRows);
        connection.end();
      });
    });
  }
};