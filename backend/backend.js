// const database = require('./apis/database');
const { database } = require('./apis/database');

var db = new database();
db.disconnect();