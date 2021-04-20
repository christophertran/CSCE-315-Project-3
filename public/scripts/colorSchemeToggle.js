// Function to toggle the theme between light and dark
function toggleTheme() {
    var slider = document.getElementById('slider');
    var pageColorScheme = document.getElementById("colorScheme");

    if (localStorage.getItem('theme') === 'theme-dark') {
        localStorage.setItem('theme', 'theme-light');

        // set color scheme
        pageColorScheme.setAttribute('href', "/stylesheets/light.css");

        slider.checked = false;
    } else {
        localStorage.setItem('theme', 'theme-dark');

        // set color scheme
        pageColorScheme.setAttribute('href', "/stylesheets/dark.css");

        slider.checked = true;
    }
}

(function () {
    var twitter = document.getElementById('twitter-timeline');
    var slider = document.getElementById('slider');

    if (localStorage.getItem('theme') === 'theme-dark') {
        if (slider) {
            slider.checked = true;
        }

        if (twitter) {
            twitter.setAttribute('data-theme', "dark");
        }
    } else {
        if (slider) {
            slider.checked = false;
        }

        if (twitter) {
            twitter.setAttribute('data-theme', "light");
        }
    }
})();