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

                document.getElementById('senatorTitle').style.opacity = 1.0;

                result.data.forEach((element) => {
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    var a = document.createElement('a');

                    var firstName = element.name.split(' ')[0].toLowerCase();
                    var lastName = element.name.split(' ')[1].toLowerCase();

                    a.setAttribute('href', '/search?politicianName=' + firstName + '+' + lastName);
                    a.setAttribute('class', 'nameLink');
                    a.text = element.name.toUpperCase();

                    btn.setAttribute('class', 'btn btn-outline-success btn-politian');

                    btn.appendChild(a);
                    li.appendChild(btn);
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