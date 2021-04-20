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

var slider = document.getElementById('slider');

if (slider) {
    if (localStorage.getItem('theme') === 'theme-dark') {
        slider.checked = true;
    } else {
        slider.checked = false;
    }
}