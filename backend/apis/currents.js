const API_INFO = require('../misc/api_info.json');
const CurrentsAPI = require('currentsapi');

module.exports = class currents {
    static k_id = 'id';
    static k_title = 'title';
    static k_description = 'description';
    static k_url = 'url';
    static k_author = 'author';
    static k_image_url = 'image';
    static k_language = 'language';
    static k_category = 'category';
    static k_published = 'published';

    constructor() {
        this.currentsapi = new CurrentsAPI(API_INFO['Currents API']['api key']);
    }

    async getArticles(_name, _size) {
        return await this.currentsapi.search({
            keywords: _name,
            language: 'en'
        }).then(response => {
            var news = response['news'];

            if (news.length < _size) {
                return news;
            } else {
                return news.slice(0, _size);
            }
        }).catch(error => {
            console.error(error);
            return {};
        })
    }
}