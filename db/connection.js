const mysql = require('mysql');
const util = require('util');



const connectionProperties = {
  host: 'localhost',
  port: 3306,
  user: 'root',

  password: 'm!Kellie6l',
  database: 'employees',
}

const connection = mysql.createConnection(connectionProperties)



connection.query = util.promisify(connection.query);

module.exports = connection