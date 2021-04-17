const backend = require('./backend.js');

async function test() {
    const bk = new backend();

    // console.log(await bk.getArticlesFromNewsByName('Joe Biden', 1));
    // console.log(await bk.getArticlesFromCurrentsByName('Joe Biden', 1));
    // console.log(await bk.getArticlesByName('biden', 5));
    // console.log(await bk.getUserTwitterInformationByName('joe biden'));
    // console.log(await bk.getUserTwitterScreenNameByName('richard shelby'));
    // console.log(await bk.getUserTwitterIDByName('richard shelby'));
    // console.log(await bk.getCongressHouseMembers());
    // console.log(await bk.getCongressSenateMembers());
    // console.log(await bk.getCongressSenateNames());
    // console.log(await bk.getCongressHouseNames());
};

test();