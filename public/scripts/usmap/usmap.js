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

                // deletes previous list
                ul.innerHTML = '';

                document.getElementById('senateTitle').style.opacity = 1.0;

                result.data.forEach((element) => {
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    var a = document.createElement('a');

                    a.setAttribute('href', '/search?politicianName=' + element);
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
                //window.scrollTo(0,document.body.scrollHeight);
            });

            axios.get("/state/house/" + data.name).then((result) => {
                var ul1 = document.getElementById('house-list1');
                var ul2 = document.getElementById('house-list2');
                var ul3 = document.getElementById('house-list3');
                var ul4 = document.getElementById('house-list4');
                var ul5 = document.getElementById('house-list5');

                // deletes previous list
                ul1.innerHTML = '';
                ul2.innerHTML = '';
                ul3.innerHTML = '';
                ul4.innerHTML = '';
                ul5.innerHTML = '';

                document.getElementById('houseTitle').style.opacity = 1.0;

                var count = 0;

                result.data.forEach((element) => {
                    count += 1;

                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    var a = document.createElement('a');

                    a.setAttribute('href', '/search?politicianName=' + element);
                    a.setAttribute('class', 'nameLink');
                    a.text = element.toUpperCase();

                    btn.setAttribute('class', 'btn btn-outline-success btn-politian');

                    btn.appendChild(a);
                    li.appendChild(btn);
                    if (count === 1) {
                        ul3.appendChild(li);
                    }
                    else if (count === 2) {
                        ul2.appendChild(li);
                    }
                    else if (count === 3) {
                        ul4.appendChild(li);
                    }
                    else if (count === 4) {
                        ul1.appendChild(li);
                    }
                    else if (count === 5) {
                        ul5.appendChild(li);
                        count = 0;
                    }
                });
            }).catch((error) => {
                console.log(error);
            }).then(()=>{
                window.scrollTo(0, document.body.scrollHeight);
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