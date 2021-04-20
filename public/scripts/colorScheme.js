// "Immediately invoked function" to change theme on page load.
(function () {
    var pageColorScheme = document.getElementById("colorScheme");
    var twitter = document.getElementById('twitter-timeline');

    if (localStorage.getItem('theme') === 'theme-dark') {
        // set color scheme
        pageColorScheme.setAttribute('href', "/stylesheets/dark.css");

        // set twitter theme 
        if (twitter) {
            twitter.setAttribute('data-theme', "dark");
        }
    } else {
        // set color scheme
        pageColorScheme.setAttribute('href', "/stylesheets/light.css");

        // set twitter theme
        if (twitter) {
            twitter.setAttribute('data-theme', "light");
        }
    }
})();