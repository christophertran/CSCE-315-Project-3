const database = require('./apis/database');
const news = require('./apis/news');
const currents = require('./apis/currents');
const twitter = require('./apis/twitter');

module.exports = class backend {
    static k_title = 'title';
    static k_description = 'description';
    static k_url = 'url';
    static k_author = 'author';
    static k_image_url = 'image';
    static k_published = 'published';

    constructor() {
        this.database = null;
        this.news = null;
        this.currents = null;
        this.twitter = null;
    }

    async getNamesFromDatabase() {
        if (!this.database) {
            this.database = new database();
        }

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

    async getNamesFromDatabaseByName(_name) {
        if (!this.database) {
            this.database = new database();
        }
        
        var query = 'SELECT name FROM politicians WHERE name LIKE \'%' + _name.toLowerCase() + '%\';';
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
        if (!this.database) {
            this.database = new database();
        }

        var query = 'SELECT * FROM politicians WHERE name LIKE \'%' + _name.toLowerCase() + '%\';';

        return await this.database.query(query).then((result) => {
            return result;
        }).catch((error) => {
            console.error("Query error: " + error);
            return {};
        });
    }

    async getNamesFromDatabaseByState(_state) {
        if (!this.database) {
            this.database = new database();
        }

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
        if (!this.news) {
            this.news = new news();
        }

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
        if (!this.currents) {
            this.currents = new currents();
        }

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

    async getUserTwitterInformationByName(_name) {
        if (!this.twitter) {
            this.twitter = new twitter();
        }

        return await this.twitter.getUserInformationByName(_name);
    }

    async getUserTwitterIDByName(_name) {
        if (!this.twitter) {
            this.twitter = new twitter();
        }

        return await this.twitter.getUserIDByName(_name);
    }

    async getUserTwitterScreenNameByName(_name) {
        if (!this.twitter) {
            this.twitter = new twitter();
        }

        return await this.twitter.getUserScreenNameByName(_name);
    }

    disconnect() {
        if (this.database) {
            this.database.disconnect();
            this.database = null;
        }
    }
}