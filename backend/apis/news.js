const API_INFO = require('../misc/api_info.json');
const NewsAPI = require('newsapi');

class news {
    constructor() {
        this.newsapi = new NewsAPI(API_INFO['News API']['api key']);
    }

    async getArticles(_name, _size) {
        return await this.newsapi.v2.topHeadlines({
            q: _name
        }).then(response => {
            var articles = response['articles'];

            if (articles.length < _size) {
                return articles;
            } else {
                return articles.slice(0, _size);
            }
        }).catch(error => {
            console.error(error);
            return {};
        });
    }
}

exports.news = news;