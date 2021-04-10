const API_INFO = require('../misc/api_info.json');
const TwitterAPI = require('twitter-api-client');

module.exports = class twitter {
    static k_id = 'id';
    static k_name = 'name';
    static k_screen_name = 'screen_name';
    static k_location = 'location';
    static k_description = 'description';
    static k_url = 'url';

    constructor() {
        this.twitterapi = new TwitterAPI.TwitterClient({
            apiKey: API_INFO['Twitter API']['api key'],
            apiSecret: API_INFO['Twitter API']['api secret key'],
            accessToken: API_INFO['Twitter API']['access token'],
            accessTokenSecret: API_INFO['Twitter API']['access token secret']
        });
    }

    async getUserInformationByName(_name) {
        const data = await this.twitterapi.accountsAndUsers.usersSearch({
            q: _name
        });

        return data[0];
    }

    async getUserIDByName(_name) {
        const data = await this.twitterapi.accountsAndUsers.usersSearch({
            q: _name
        });

        return data[0][twitter.k_id];
    }

    async getUserScreenNameByName(_name) {
        const data = await this.twitterapi.accountsAndUsers.usersSearch({
            q: _name
        });

        return data[0][twitter.k_screen_name];
    }
}