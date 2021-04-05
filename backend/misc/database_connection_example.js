const DATABASE_INFO = require('./database_info.json');

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: DATABASE_INFO.RDS_HOSTNAME,
    user: DATABASE_INFO.RDS_USERNAME,
    password: DATABASE_INFO.RDS_PASSWORD,
    database: DATABASE_INFO.RDS_DB_NAME,
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Successfully connected to database');
});

connection.query('SELECT * FROM politicians LIMIT 2;', function (err, res, fields) {
    if (err) {
        console.error('Database query error');
        return;
    }

    res.forEach(element => {
        console.log(element)
    });
});

connection.end(function (err) {
    if (err) {
        console.error('Database disconnect failed: ' + err.stack);
        return;
    }

    console.log('Successfully disconnected to database');
});