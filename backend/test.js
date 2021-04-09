const { backend } = require('./backend');

async function test() {
    var bk = new backend();

    // console.log(await bk.getNamesFromDatabase());
    // console.log(await bk.getInformationFromDatabaseByName('richard shelby'));
    // console.log(await bk.getInformationFromDatabaseByName('billy mays'));
    // console.log(await bk.getNamesFromDatabaseByState('Texas'));
    // console.log(await bk.getArticlesFromNewsByName('biden', 1));
    // console.log(await bk.getArticlesFromCurrentsByName('biden', 1));
    // console.log(await bk.getArticlesByName('biden', 5));

    bk.disconnect();
};

test();