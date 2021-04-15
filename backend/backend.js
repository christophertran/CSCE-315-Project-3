const database = require('./apis/database');
const news = require('./apis/news');
const currents = require('./apis/currents');
const twitter = require('./apis/twitter');
const congress = require('./apis/congress');

module.exports = class backend {
    static k_title = 'title';
    static k_description = 'description';
    static k_url = 'url';
    static k_author = 'author';
    static k_image_url = 'image';
    static k_published = 'published';
    static k_api = 'api';

    constructor() {
        this.database = null;
        this.news = null;
        this.currents = null;
        this.twitter = null;
        this.congress = null;
    }

    getArticlesByName(_name, _size) {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        return this.getArticlesFromNewsByName(_name, Math.ceil(_size / 2)).then((news) => {
            return this.getArticlesFromCurrentsByName(_name, Math.floor(_size / 2)).then((currents) => {
                var articles = news.concat(currents);
                shuffleArray(articles);
                return articles;
            });
        });
    }

    getArticlesFromNewsByName(_name, _size) {
        if (!this.news) {
            this.news = new news();
        }

        return this.news.getArticles(_name, _size).then((results) => {
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
                    temp[backend.k_api] = 'NewsAPI';

                    ret.push(temp);
                });
            }

            return ret;
        });
    }

    getArticlesFromCurrentsByName(_name, _size) {
        if (!this.currents) {
            this.currents = new currents();
        }

        return this.currents.getArticles(_name, _size).then((results) => {
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
                    temp[backend.k_api] = 'CurrentsAPI';

                    ret.push(temp);
                });
            }

            return ret;
        });
    }

    getUserTwitterInformationByName(_name) {
        if (!this.twitter) {
            this.twitter = new twitter();
        }

        return this.twitter.getUserInformationByName(_name).then((results) => {
            return results;
        });
    }

    getCongressMembersNames() {
        return this.getCongressSenateMembersNames().then((senate) => {
            return this.getCongressHouseMembersNames().then((house) => {
                return senate.concat(house);
            });
        });
    }

    getCongressSenateMembersNames() {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getSenateMembers().then((members) => {
            var temp = [];

            members.forEach((member) => {
                temp.push(member.first_name + ' ' + member.last_name);
            });

            return temp;
        });
    }

    getCongressHouseMembersNames() {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getHouseMembers().then((members) => {
            var temp = [];

            members.forEach((member) => {
                temp.push(member.first_name + ' ' + member.last_name);
            });

            return temp;
        });
    }

    getCongressMembersByState(_state) {
        return this.getCongressSenateMemberNamesByState(_state).then((senate) => {
            return this.getCongressHouseMemberNamesByState(_state).then((house) => {
                var temp = {};
                temp['senate'] = senate;
                temp['house'] = house;

                return temp;
            });
        });
    }

    getCongressSenateMemberNamesByState(_state) {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getSenateMembers().then((members) => {
            var temp = [];

            members.forEach((member) => {
                if (member.state == _state) {
                    temp.push(member.first_name + ' ' + member.last_name);
                }
            });

            return temp;
        });
    }

    getCongressHouseMemberNamesByState() {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getHouseMembers().then((members) => {
            var temp = [];

            members.forEach((member) => {
                if (member.state == _state) {
                    temp.push(member.first_name + ' ' + member.last_name);
                }
            });

            return temp;
        });
    }

    getCongressMembers() {
        return this.getCongressSenateMembers().then((senate) => {
            return this.getCongressHouseMembers().then((house) => {
                return senate.concat(house);
            });
        });
    }

    getCongressSenateMembers() {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getSenateMembers().then((members) => {
            var temp = {};

            members.forEach((member) => {
                member.age = this.getAge(member.date_of_birth);
                member.image_url = this.getPoliticianImageURL(member.id);
                member.full_name = (member.first_name + ' ' + member.last_name);
                temp[member.full_name.toLowerCase()] = member;
            });

            return temp;
        });
    }

    getCongressHouseMembers() {
        if (!this.congress) {
            this.congress = new congress();
        }

        return this.congress.getHouseMembers().then((members) => {
            var temp = {};

            members.forEach((member) => {
                member.age = this.getAge(member.date_of_birth);
                member.image_url = this.getPoliticianImageURL(member.id);
                member.full_name = (member.first_name + ' ' + member.last_name);
                temp[member.full_name.toLowerCase()] = member;
            });

            return temp;
        });
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    getPoliticianImageURL(_id) {
        return `https://theunitedstates.io/images/congress/original/${_id}.jpg`;
    }

    disconnect() {
        if (this.database) {
            this.database.disconnect();
            this.database = null;
        }
    }
}