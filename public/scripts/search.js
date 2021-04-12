function search() {
    var input = document.getElementById('myInput').value;

    if (!input) {
        return;
    }

    input = input.toLowerCase();

    // clear what's already on the page to get ready for new articles to be put in
    clearList();
    // put in new news articles taken from the back end
    axios.get("/search/" + input).then((res) => {
        addFeed(res.data);
    });

    // display twitter feed of said person
    // axios.get("/twitter-feed/" + input).then((res) => {
    //     var twitter = document.getElementsByClassName("twitter-timeline")[0];
    //     twitter.href = "https://twitter.com/" + res.data;
    //     twitter.innerText = res.data;
    // });
}

function clearList() {
    var ul = document.getElementById("dynamic-list");
    ul.innerHTML = '';
}

function addItem(articleInfo) {
    // get information form the html about the current list and the what the user inputted in the text box
    var ul = document.getElementById("dynamic-list");
    ul.setAttribute('class', "card-list hidden");
    ul.setAttribute('style', "text-align:left;");
    var candidate = document.getElementById("myInput");

    // create a new list element to be put populated with information from the candidate
    var li = document.createElement("li");

    // create a div that will act as the card for the list item
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute('class', "card mb-3");
    cardBodyDiv.setAttribute('style', "max-width: 1000px; min-width:300px");

    // set class of div for the row g-0 divider
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', "row g-0");

    // set class of div for the image
    var imageColumnDiv = document.createElement("div");
    imageColumnDiv.setAttribute('class', "col-md-4");
    //img
    var articleImage = document.createElement("img");
    articleImage.setAttribute('src', articleInfo.image);
    articleImage.setAttribute('style', "width: 100%; height:auto; display: inline-block; vertical-align: middle;");
    //articleImage.appendChild(articleImageContent); // add the text node to the newly created h5

    // set class of div for the text
    var textColumnDiv = document.createElement("div");
    textColumnDiv.setAttribute('class', "col-md-8");
    textColumnDiv.setAttribute('style', "padding-left: 5px");

    // text wrap
    var textDiv = document.createElement("div");
    textDiv.setAttribute('class', "card-body"); // set class of the top div
    // topDiv.setAttribute('style', "padding-top: 10px; max-width: 900px;"); // set style of the top div
    //h5
    var articleTitle = document.createElement("h5");
    articleTitle.setAttribute('class', "card-title");
    const articleTitleContent = document.createTextNode(articleInfo.title);
    articleTitle.appendChild(articleTitleContent); // add the text node to the newly created h5
    //p
    var blurb = document.createElement("p");
    blurb.setAttribute('class', "card-text");
    const blurbContent = document.createTextNode(articleInfo.description);
    blurb.appendChild(blurbContent); // add the text node to the newly created p
    //p muted

    //a href
    var linker = document.createElement("a");
    linker.setAttribute('href', articleInfo.url);
    linker.setAttribute('class', "article-text");
    linker.setAttribute('target', "_blank");
    li.setAttribute('id', candidate.value); // set id of this list item to be the searched value

    // add text into text div (textDiv)
    textDiv.appendChild(articleTitle);
    textDiv.appendChild(blurb);

    // add top div into whole text column
    textColumnDiv.appendChild(textDiv);

    // add image to its corresponding column
    imageColumnDiv.appendChild(articleImage)

    // add image and text columns to row div
    rowDiv.appendChild(imageColumnDiv);
    rowDiv.appendChild(textColumnDiv);

    // have the card body add everything in the row
    cardBodyDiv.appendChild(rowDiv);

    // cardBodyDiv.appendChild(articleTitle);
    // cardBodyDiv.appendChild(blurb);
    // textColumnDiv.appendChild(cardBodyDiv);
    // imageColumnDiv.appendChild(articleImage);
    // rowDiv.appendChild(imageColumnDiv);
    // rowDiv.appendChild(textColumnDiv);
    // topDiv.appendChild(rowDiv);

    // add the link to the card div
    linker.appendChild(cardBodyDiv);
    // add everything as a list item
    li.appendChild(linker);
    // add list item as a child of the current unordered list
    ul.appendChild(li);
}

function addFeed(feedArray) {
    feedArray.forEach(articleInfo => {
        addItem(articleInfo);
    });
}