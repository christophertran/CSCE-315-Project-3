window.onload = (event) => {
    axios.get("/allpoliticians").then((result) => {
        const ordered_senate = Object.keys(result.data.senate).sort().reduce((obj, key) => {
            obj[key] = result.data.senate[key];
            return obj;
        }, {});

        Object.entries(ordered_senate).forEach(([key, value]) => {
            console.log(key);
            value.forEach((name) => {
                console.log(name)
            });
        });

        // const ordered_house = Object.keys(result.data.house).sort().reduce((obj, key) => {
        //     obj[key] = result.data.house[key];
        //     return obj;
        // }, {});

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