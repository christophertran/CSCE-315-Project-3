$(document).ready(function () {
    $('#map').usmap({
        // 'mouseoverState': {
        //     'HI': function (event, data) {
        //         //return false;
        //     }
        // },

        // 'mouseover': function (event, data) {
        // },

        'click': function (event, data) {
            var title = document.getElementById('map-title');
            title.innerText = 'Select a State: ' + states[data.name];

            axios.get("/state/senate/" + data.name).then((result) => {
                var ul = document.getElementById('senate-list');

                ul.innerHTML = '';

                document.getElementById('senateTitle').style.opacity = 1.0;

                result.data.forEach((element) => {
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    var a = document.createElement('a');

                    var firstName = element.split(' ')[0].toLowerCase();
                    var lastName = element.split(' ')[1].toLowerCase();

                    a.setAttribute('href', '/search?politicianName=' + firstName + '+' + lastName);
                    a.setAttribute('class', 'nameLink');
                    a.text = element.toUpperCase();

                    btn.setAttribute('class', 'btn btn-outline-success btn-politian');

                    btn.appendChild(a);
                    li.appendChild(btn);
                    ul.appendChild(li);
                });
            }).catch((error) => {
                console.log(error);
            }).then(()=>{
                window.scrollTo(0,document.body.scrollHeight);
            });

            axios.get("/state/house/" + data.name).then((result) => {
                var ul = document.getElementById('house-list');

                ul.innerHTML = '';

                document.getElementById('houseTitle').style.opacity = 1.0;

                result.data.forEach((element) => {
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    var a = document.createElement('a');

                    var firstName = element.split(' ')[0].toLowerCase();
                    var lastName = element.split(' ')[1].toLowerCase();

                    a.setAttribute('href', '/search?politicianName=' + firstName + '+' + lastName);
                    a.setAttribute('class', 'nameLink');
                    a.text = element.toUpperCase();

                    btn.setAttribute('class', 'btn btn-outline-success btn-politian');

                    btn.appendChild(a);
                    li.appendChild(btn);
                    ul.appendChild(li);
                });
            }).catch((error) => {
                console.log(error);
            }).then(()=>{
                window.scrollTo(0,document.body.scrollHeight);
            });
        },

        'stateHoverStyles': {
            fill: '#198754'
        },

        'labelBackingHoverStyles': {
            fill: '#198754'
        },

        showLabels: true
    });
});

const states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};