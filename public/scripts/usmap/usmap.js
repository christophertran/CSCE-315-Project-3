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
                var out = '';
                result.data.forEach(element => {
                    out += ' | ' + element.name.toUpperCase();
                });
                out += ' | ';

                $('#alert')
                .text(out)
                .stop()
                .css('backgroundColor', 'yellow')
                .animate({ backgroundColor: '#ddd' }, 1000);
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