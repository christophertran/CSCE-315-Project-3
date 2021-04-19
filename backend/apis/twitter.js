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
            apiKey: process.env.TWITTER_API_KEY,
            apiSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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