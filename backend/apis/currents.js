const API_INFO = require('../misc/api_info.json');
const CurrentsAPI = require('currentsapi');

class currents {
    constructor() {
        this.currentsapi = new CurrentsAPI(API_INFO['Currents API']['api key']);
    }

    async getArticles(_name, _size) {
        return await this.currentsapi.search({
            keywords: _name
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

exports.currents = currents;