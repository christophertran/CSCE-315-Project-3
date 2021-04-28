var senate;
var house;

window.onload = (event) => {
    axios.get("/allpoliticians").then((result) => {
        const ordered_senate = Object.keys(result.data.senate).sort().reduce((obj, key) => {
            obj[key] = result.data.senate[key];
            return obj;
        }, {});

        senate = ordered_senate;

        //Object.entries(ordered_senate).forEach(([key, value]) => {
        //    console.log(key);
        //    value.forEach((name) => {
        //        console.log(name)
        //    });
        //});

        const ordered_house = Object.keys(result.data.house).sort().reduce((obj, key) => {
            obj[key] = result.data.house[key];
            return obj;
        }, {});

        house = ordered_house;

        getSenate();

        // Object.entries(ordered_house).forEach(([key, value]) => {
        //     console.log(key);
        //     value.forEach((name) => {
        //         console.log(name)
        //     });
        // });
    }).catch((error) => {
        console.log(error);
    });
};


function getSenate() {
    var senate_btn = document.getElementById('senate-btn');
    senate_btn.removeAttribute('class');
    senate_btn.setAttribute('class', 'btn selected');

    var house_btn = document.getElementById('house-btn');
    house_btn.removeAttribute('class');
    house_btn.setAttribute('class', 'btn not-selected');

    var top = document.getElementById("politician-list");
    top.innerHTML = "";
    top.removeAttribute('class');
    top.setAttribute('class', 'row senate-list');
    
    Object.entries(senate).forEach(([key, value]) => {
        var small_container = document.createElement('div');
        small_container.setAttribute('class', 'container small-container');
        
        var state_row = document.createElement('div');
        state_row.setAttribute('class', 'row');

        var state_title = document.createElement('h3');
        state_title.setAttribute('class', 'title-adapt-color')
        state_title.innerText = key;

        state_row.appendChild(state_title);
        small_container.appendChild(state_row);

        var people_row = document.createElement('div');
        people_row.setAttribute('class', 'row');

        value.forEach((name) => {
            var a = document.createElement('a');

            a.setAttribute('href', '/search?politicianName=' + name);
            a.setAttribute('class', 'title-adapt-color');
            a.text = name.toUpperCase();

            people_row.appendChild(a);
        });

        small_container.appendChild(people_row);
        top.appendChild(small_container);
    });
}

function getHouse() {
    var senate_btn = document.getElementById('senate-btn');
    senate_btn.removeAttribute('class');
    senate_btn.setAttribute('class', 'btn not-selected');

    var house_btn = document.getElementById('house-btn');
    house_btn.removeAttribute('class');
    house_btn.setAttribute('class', 'btn selected');

    var top = document.getElementById("politician-list");
    top.innerHTML = "";
    top.removeAttribute('class');
    top.setAttribute('class', 'row house-list');
    
    Object.entries(house).forEach(([key, value]) => {
        var small_container = document.createElement('div');
        small_container.setAttribute('class', 'container small-container');

        var state_row = document.createElement('div');
        state_row.setAttribute('class', 'row');

        var state_title = document.createElement('h3');
        state_title.setAttribute('class', 'title-adapt-color')
        state_title.innerText = key;

        state_row.appendChild(state_title);
        small_container.appendChild(state_row);

        var people_row = document.createElement('div');
        people_row.setAttribute('class', 'row');

        value.forEach((name) => {
            var a = document.createElement('a');

            a.setAttribute('href', '/search?politicianName=' + name);
            a.setAttribute('class', 'title-adapt-color');
            a.text = name.toUpperCase();

            people_row.appendChild(a);
        });

        small_container.appendChild(people_row);
        top.appendChild(small_container);
    });
}
