// "Immediately invoked function" to change theme on page load.
(function () {
    var pageColorScheme = document.getElementById("colorScheme");

    if (localStorage.getItem('theme') === 'theme-dark') {
        pageColorScheme.setAttribute('href', "/stylesheets/dark.css");
    } else {
        pageColorScheme.setAttribute('href', "/stylesheets/light.css");
    }
})();