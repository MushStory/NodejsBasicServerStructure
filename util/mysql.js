const mysql = require('mysql2');
const dbConfig = require('../config/db-config.json');
const pool = mysql.createPool(dbConfig);
const connection = pool.promise();

const exec = async (sql) => {
    let [r, f] = await connection.query(sql);
    return r;
};

const escape = (value) => {
    return connection.escape(value);
};

module.exports = { exec, escape };
