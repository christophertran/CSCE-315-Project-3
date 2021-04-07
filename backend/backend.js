const { database } = require('./apis/database');

class backend {
    constructor() {
        this.db = new database();
    }

    async getNames() {
        var query = 'SELECT name FROM politicians;';
        var results = await this.db.query(query);

        var ret = [];

        if (results) {
            results.forEach(element => {
                ret.push(element['name']);
            });
        }

        return ret;
    }

    async getInformationByName(_name) {
        var query = 'SELECT * FROM politicians WHERE name LIKE \'%' + _name.toLowerCase() + '%\';';

        return await this.db.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + _name);
            return {};
        });
    }

    async getNamesByState(_state) {
        var query = 'SELECT * FROM politicians WHERE state LIKE \'%' + _state.toLowerCase() + '%\';';

        return await this.db.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + _name);
            return {};
        });
    }

    disconnect() {
        this.db.disconnect();
    }
}

async function test() {
    var bk = new backend();

    // console.log(await bk.getNames());
    // console.log(await bk.getInformationByName('richard shelby'));
    // console.log(await bk.getInformationByName('billy mays'));
    console.log(await bk.getNamesByState('Texas'));

    bk.disconnect();
};

test();