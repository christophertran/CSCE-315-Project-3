const CongressAPI = require('propublica-congress-node');

module.exports = class currents {
    constructor() {
        this.congressapi = new CongressAPI(process.env.CONGRESS_API_KEY);
        this.congressNumber = 117;

        this.senate = null;
        this.senateTimeout = null;
        this.senateTimeoutTime = 15 * 60 * 1000; // n minutes * 60 seconds * 1000 milliseconds // 5 minute timeout

        this.house = null;
        this.houseTimeout = null;
        this.houseTimeoutTime = 15 * 60 * 1000; // n minutes * 60 seconds * 1000 milliseconds // 5 minute timeout
    }

    async getSenateMembers() {
        if (this.senate == null || this.senateTimeout == null) {
            this.senateTimeout = setTimeout(() => {
                this.senateTimeout = null;
            }, this.senateTimeoutTime);

            return this.getSenateMembersFromAPI().then((senate) => {
                this.senate = senate;
                return this.senate;
            });
        } else {
            return this.senate;
        }
    }

    async getSenateMembersFromAPI() {
        return this.congressapi.memberLists({
            congressNumber: this.congressNumber,
            chamber: 'senate'
        }).then((res) => {
            console.log('Refreshing senate member information from ProPublica Congress API');
            return res.results[0].members;
        });
    }

    async getHouseMembers() {
        if (this.house == null || this.houseTimeout == null) {
            this.houseTimeout = setTimeout(() => {
                this.houseTimeout = null;
            }, this.houseTimeoutTime);

            return this.getHouseMembersFromAPI().then((house) => {
                this.house = house;
                return this.house;
            });
        } else {
            return this.house;
        }
    }

    async getHouseMembersFromAPI() {
        return this.congressapi.memberLists({
            congressNumber: this.congressNumber,
            chamber: 'house'
        }).then((res) => {
            console.log('Refreshing house member information from ProPublica Congress API');
            return res.results[0].members;
        });
    }
}