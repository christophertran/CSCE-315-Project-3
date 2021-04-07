const API_INFO = require('../misc/api_info.json');
const NewsAPI = require('newsapi');

class news {
    constructor() {
        this.newsapi = new NewsAPI(API_INFO['News API']['api key']);
    }

    async getArticles(_name, _size) {
        return await this.newsapi.v2.everything({
            q: _name,
            language: 'en',
            sortBy: 'relevancy',
            pageSize: _size,
            page: 1
        }).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
            return {};
        });
    }
}

exports.news = news;