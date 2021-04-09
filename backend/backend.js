const { database } = require('./apis/database');
const { news } = require('./apis/news');
const { currents } = require('./apis/currents');

class backend {
    static k_title = 'title';
    static k_description = 'description';
    static k_url = 'url';
    static k_author = 'author';
    static k_image_url = 'image';
    static k_published = 'published';

    constructor() {
        this.database = new database();
        this.news = new news();
        this.currents = new currents();
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
            console.error("Query error: " + error);
            return {};
        });
    }

    async getNamesFromDatabaseByState(_state) {
        var query = 'SELECT * FROM politicians WHERE state LIKE \'%' + _state.toLowerCase() + '%\';';

        return await this.database.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + error);
            return {};
        });
    }

    async getArticlesByName(_name, _size) {
        var news = await this.getArticlesFromNewsByName('biden', Math.ceil(_size / 2));
        var currents = await this.getArticlesFromCurrentsByName('biden', Math.floor(_size / 2));

        var articles = news.concat(currents);

        return articles;
    }

    async getArticlesFromNewsByName(_name, _size) {
        var results = await this.news.getArticles(_name, _size);

        var ret = [];

        if (results) {
            results.forEach(element => {
                var temp = {}

                temp[backend.k_title] = element[news.k_title];
                temp[backend.k_author] = element[news.k_author];
                temp[backend.k_description] = element[news.k_description];
                temp[backend.k_url] = element[news.k_url];
                temp[backend.k_image_url] = element[news.k_image_url];
                temp[backend.k_published] = element[news.k_published];

                ret.push(temp);
            });
        }

        return ret;
    }

    async getArticlesFromCurrentsByName(_name, _size) {
        var results = await this.currents.getArticles(_name, _size);

        var ret = [];

        if (results) {
            results.forEach(element => {
                var temp = {}

                temp[backend.k_title] = element[currents.k_title];
                temp[backend.k_author] = element[currents.k_author];
                temp[backend.k_description] = element[currents.k_description];
                temp[backend.k_url] = element[currents.k_url];
                temp[backend.k_image_url] = element[currents.k_image_url];
                temp[backend.k_published] = element[currents.k_published];

                ret.push(temp);
            });
        }

        return ret;
    }

    disconnect() {
        this.database.disconnect();
    }
}

exports.backend = backend;