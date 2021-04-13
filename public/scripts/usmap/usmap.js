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
            axios.get("/state/" + data.name).then((result) => {
                var ul = document.getElementById('politician-list');

                ul.innerHTML = '';

                result.data.forEach((element) => {
                    var li = document.createElement('li');
                    var a = document.createElement('a');

                    var firstName = element.name.split(' ')[0].toLowerCase();
                    var lastName = element.name.split(' ')[1].toLowerCase();

                    a.setAttribute('href', '/search?politicianName=' + firstName + '+' + lastName);
                    a.text = element.name.toUpperCase();

                    li.appendChild(a);
                    ul.appendChild(li);
                });
            }).catch((error) => {
                console.log(error);
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