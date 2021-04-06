const DATABASE_INFO = require('../misc/database_info.json');
const mysql = require("mysql");

class database {
    constructor() {
        this.connection = mysql.createConnection({
            host: DATABASE_INFO.RDS_HOSTNAME,
            user: DATABASE_INFO.RDS_USERNAME,
            password: DATABASE_INFO.RDS_PASSWORD,
            database: DATABASE_INFO.RDS_DB_NAME,
        });

        this.connect();
    }

    connect() {
        this.connection.connect(function (err) {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
            } else {
                console.log('Successfully connected to database');
            }
        });
    }

    query(_query) {
        this.connection.query(_query, function (err, res, fields) {
            if (err) {
                console.error('Database query error');
            } else {
                res.forEach(element => {
                    console.log(element)
                });
            }
        });
    }

    disconnect() {
        this.connection.end(function (err) {
            if (err) {
                console.error('Database disconnect failed: ' + err.stack);
            } else {
                console.log('Successfully disconnected to database');
            }
        });
    }
}