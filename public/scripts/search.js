function search_test() {
    var input = document.getElementById('myInput');
	input = input.toLowerCase();
	
	clearList();
    addItem({
        title: 'Biden’s new Supreme Court commission is a win for the Federalist Society - Vox.com',
        author: 'Ian Millhiser',
        description: 'The president’s new commission won’t fix anything.',
        url: 'https://www.vox.com/2021/4/10/22375792/supreme-court-biden-commission-reform-court-packing-federalist-society',
        image: 'https://cdn.vox-cdn.com/thumbor/sgRBwypAhXuYeMjHIJ9IbZk5KBY=/0x258:3603x2144/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22294571/1230698067.jpg',
        published: '2021-04-10T12:30:00Z'
    }); // Switch to addFeed() when backend is connected
}
function clearList() {
    var ul = document.getElementById("dynamic-list");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
        //ul.removeChild(ul.lastElementChild);
        ul.removeChild(items[i]); // They do the same thing
    }
}
function addItem(articleInfo) {
    // get information form the html about the current list and the what the user inputted in the text box
	var ul = document.getElementById("dynamic-list");
	var candidate = document.getElementById("search-box");

	// create a new list element to be put populated with information from the candidate
	var li = document.createElement("li");
	var cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute('class', "card-body"); // set class of div for the text body
    var textColumnDiv = document.createElement("div");
    textColumnDiv.setAttribute('class', "col-md-8"); // set class of div for the text
    var imageColumnDiv = document.createElement("div");
    imageColumnDiv.setAttribute('class', "col-md-4"); // set class of div for the image
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', "row g-0"); // set class of div for the row g-0 divider

    var topDiv = document.createElement("div");
    topDiv.setAttribute('class', "card mb-3"); // set class of the top div
    topDiv.setAttribute('style', "padding-top: 10px; max-width: 850px;"); // set style of the top div

    //img
    var articleImage = document.createElement("img");
    articleImage.setAttribute('src', articleInfo.image);
    articleImage.setAttribute('style', "width: 100%; height:auto;");
    //articleImage.appendChild(articleImageContent); // add the text node to the newly created h5
    
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
    
    cardBodyDiv.appendChild(articleTitle);
    cardBodyDiv.appendChild(blurb);
    textColumnDiv.appendChild(cardBodyDiv);
    imageColumnDiv.appendChild(articleImage);
    rowDiv.appendChild(imageColumnDiv);
    rowDiv.appendChild(textColumnDiv);
    topDiv.appendChild(rowDiv);
    
    linker.appendChild(topDiv);
    li.appendChild(linker);
	ul.appendChild(li);
}
function addFeed(feedArray) {
    for (article in feedArray) {
        addItem(article);
    }
}