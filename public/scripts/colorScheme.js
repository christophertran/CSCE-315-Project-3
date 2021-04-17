// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        localStorage.setItem('theme', 'theme-light');

        // set color scheme
        var pageColorScheme = document.getElementById("colorScheme");
        console.log(pageColorScheme.getAttribute('href'));
        pageColorScheme.setAttribute('href', "/stylesheets/light.css");

        // set twitter theme
        var twitter = document.getElementById('twitter-timeline');
        if (twitter != null) {
            twitter.setAttribute('data-theme', "light");
        }

        console.log(pageColorScheme.getAttribute('href'));

        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-dark');
        localStorage.setItem('theme', 'theme-dark');
        
        // set color scheme
        var pageColorScheme = document.getElementById("colorScheme");
        console.log(pageColorScheme.getAttribute('href'));
        pageColorScheme.setAttribute('href', "/stylesheets/dark.css");

        // set twitter theme
        var twitter = document.getElementById('twitter-timeline');
        if (twitter != null) {
            twitter.setAttribute('data-theme', "dark");
        }

        console.log(pageColorScheme.getAttribute('href'));

        document.getElementById('slider').checked = true;
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        localStorage.setItem('theme', 'theme-dark');
        
        // set color scheme
        var pageColorScheme = document.getElementById("colorScheme");
        console.log(pageColorScheme.getAttribute('href'));
        pageColorScheme.setAttribute('href', "/stylesheets/dark.css");
        console.log(pageColorScheme.getAttribute('href'));

        // set twitter theme 
        var twitter = document.getElementById('twitter-timeline');
        if (twitter != null) {
            twitter.setAttribute('data-theme', "dark");
        }
        
        document.getElementById('slider').checked = true;
    } else {
        setTheme('theme-light');
        localStorage.setItem('theme', 'theme-light');

        // set color scheme
        var pageColorScheme = document.getElementById("colorScheme");
        console.log(pageColorScheme.getAttribute('href'));
        pageColorScheme.setAttribute('href', "/stylesheets/light.css");
        console.log(pageColorScheme.getAttribute('href'));

        // set twitter theme
        var twitter = document.getElementById('twitter-timeline');
        if (twitter != null) {
            twitter.setAttribute('data-theme', "light");
        }
        document.getElementById('slider').checked = false;
    }
})();