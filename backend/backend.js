const { database } = require('./apis/database');
const { news } = require('./apis/news');

class backend {
    constructor() {
        this.database = new database();
        this.news = new news();
    }

    async getNamesFromDatabase() {
        var query = 'SELECT name FROM politicians;';
        var results = await this.database.query(query);

        var ret = [];

        if (results) {
            results.forEach(element => {
                ret.push(element['name']);
            });
        }

        return ret;
    }

    async getInformationFromDatabaseByName(_name) {
        var query = 'SELECT * FROM politicians WHERE name LIKE \'%' + _name.toLowerCase() + '%\';';

        return await this.database.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + _name);
            return {};
        });
    }

    async getNamesFromDatabaseByState(_state) {
        var query = 'SELECT * FROM politicians WHERE state LIKE \'%' + _state.toLowerCase() + '%\';';

        return await this.database.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + _name);
            return {};
        });
    }

    async getArticlesFromNewsByName(_name, _size) {
        var result = await this.news.getArticles(_name, _size);

        if (result) {
            return result['articles'];
        }
    }

    disconnect() {
        this.database.disconnect();
    }
}

async function test() {
    var bk = new backend();

    // console.log(await bk.getNamesFromDatabase());
    // console.log(await bk.getInformationFromDatabaseByName('richard shelby'));
    // console.log(await bk.getInformationFromDatabaseByName('billy mays'));
    // console.log(await bk.getNamesFromDatabaseByState('Texas'));
    console.log(await bk.getArticlesFromNewsByName('biden', 3));

    bk.disconnect();
};

test();