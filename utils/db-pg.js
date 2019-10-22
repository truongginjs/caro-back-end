var { Client } = require("pg");
require("dotenv").config();
let connectstr = process.env.DB_URL

var createCon = () => {
  return new Client({
    connectionString: connectstr
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
        console.log(results.rows);
        connection.end();
      });
    });
  },
  find: (table, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createCon();
      connection.connect();
      let sql = `select * from ${table} where`;
      // email='${entity.email}' and password='${entity.password}' limit 1
      let values = Object.keys(entity).map(key => {
        return entity[key];
      });
      Object.keys(entity).map((key, i) => {
        sql += ` ${key} = $${i + 1} and`;
      });

      sql = sql.substr(0, sql.length - 3);
      sql += "limit 1"
      connection.query(sql, values, (error, results) => {
        if (error) reject(error);
        else resolve(results.rows);
        console.log(results.rows);
        connection.end();
      });
    });
  },
  add: (table, entity) => {
    var sql = `insert into ${table} `;
    var cols = "(";
    var temp = "(";
    Object.keys(entity).forEach((key, i) => {
      cols += ` ${key},`;
      temp += ` $${i + 1},`;
    });
    sql += cols;
    sql = sql.substr(0, sql.length - 1);
    sql += ") values ";
    sql += temp;
    sql = sql.substr(0, sql.length - 1);
    sql += ")";
    // console.log(sql);
    var values = Object.keys(entity).map(key => {
      return entity[key];
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
  update: (table, entity) => {
    var sql = `update ${table} set`;
    Object.keys(entity).forEach((key, i) => {
      sql += ` ${key} = $${i + 1},`;
    });
    sql = sql.substr(0, sql.length - 1);
    sql += ` where id = ${entity.id}`;
    console.log(sql);
    var values = Object.keys(entity).map(key => {
      return entity[key];
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
      connection.query(sql, values, (err, value) => {

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