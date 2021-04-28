var ordered_senate;
var ordered_house;

window.onload = (event) => {
    axios.get("/allpoliticians").then((result) => {
        ordered_senate = Object.keys(result.data.senate).sort().reduce((obj, key) => {
            obj[key] = result.data.senate[key];
            return obj;
        }, {});

        // Object.entries(ordered_senate).forEach(([key, value]) => {
        //     console.log(key);
        //     value.forEach((name) => {
        //         console.log(name)
        //     });
        // });

        ordered_house = Object.keys(result.data.house).sort().reduce((obj, key) => {
            obj[key] = result.data.house[key];
            return obj;
        }, {});

        Object.entries(ordered_house).forEach(([key, value]) => {
            console.log(key);
            value.forEach((name) => {
                console.log(name)
            });
        });
    }).catch((error) => {
        console.log(error);
    });
};

function display_senate() {
    // get container div to put information in
    // delete what is already in the container to get ready to put new information in
    // populate with senators
}

function display_house() {
    // get container div to put information in
    // delete what is already in the container to get ready to put new information in
    // populate with house members
}