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
        if (this.connection) {
            this.connection.connect(function (err) {
                if (err) {
                    console.error('Database connection failed: ' + err.stack);
                }
            });
        } else {
            console.error('Connection has not been created');
        }
    }

    query(_query) {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.query(_query, function (err, res, fields) {
                    if (err) {
                        console.error('Database query error');
                        reject({});
                    } else {
                        if (res) {
                            resolve(res);
                        } else {
                            reject({});
                        }
                    }
                });
            } else {
                reject({});
            }
        });
    }

    disconnect() {
        if (this.connection) {
            this.connection.end(function (err) {
                if (err) {
                    console.error('Database disconnect failed: ' + err.stack);
                }
            });
        } else {
            console.error('Connection has not been created');
        }
    }
}

exports.database = database;