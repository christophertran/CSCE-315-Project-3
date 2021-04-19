const NewsAPI = require('newsapi');

module.exports = class news {
    static k_source = 'source';
    static k_source_id = 'id';
    static k_source_name = 'name';
    static k_author = 'author';
    static k_title = 'title';
    static k_description = 'description';
    static k_url = 'url';
    static k_image_url = 'urlToImage';
    static k_published = 'publishedAt';
    static k_content = 'content';

    constructor() {
        this.newsapi = new NewsAPI(process.env.NEWS_API_KEY);
    }

    async getArticles(_name, _size) {
        return await this.newsapi.v2.everything({
            q: _name,
            language: 'en',
            sortBy: 'relevancy'
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