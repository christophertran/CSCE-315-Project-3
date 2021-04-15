const API_INFO = require('../misc/api_info.json');
const CongressAPI = require('propublica-congress-node');

module.exports = class currents {
    constructor() {
        this.congressapi = new CongressAPI(API_INFO['Congress API']['api key']);
        this.congressNumber = 117;
    }

    async getSenateMembers() {
        return this.congressapi.memberLists({
            congressNumber: this.congressNumber,
            chamber: 'senate'
        }).then(function (res) {
            return res.results[0].members;
        });
    }

    async getHouseMembers() {
        return this.congressapi.memberLists({
            congressNumber: this.congressNumber,
            chamber: 'house'
        }).then(function (res) {
            return res.results[0].members;
        });
    }
}