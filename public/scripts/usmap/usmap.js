$(document).ready(function () {
    $('#map').usmap({
        'mouseoverState': {
            'HI': function (event, data) {
                //return false;
            }
        },

        'click': function (event, data) {
            $('#alert')
                .text('Click ' + data.name)
                .stop()
                .css('backgroundColor', 'yellow')
                .animate({ backgroundColor: '#ddd' }, 1000);
        }
    });
});