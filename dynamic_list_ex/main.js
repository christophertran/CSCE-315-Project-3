function addItem() {
	// get information form the html about the current list and the what the user inputted in the text box
	var ul = document.getElementById("dynamic-list");
	var candidate = document.getElementById("candidate");

	// create a new list element to be put populated with information from the candidate
	var li = document.createElement("li");
	li.setAttribute('id', candidate.value); // set id of this list item to be what it is populated with
	li.appendChild(document.createTextNode(candidate.value));
	ul.appendChild(li)
}

function removeItem() {
	var ul = document.getElementById("dynamic-list");
	var candidate = document.getElementById("candidate");
	var item = document.getElementById(candidate.value);
	// remove the child with the same id as item in the list (list items were created with the same id as their info)
	ul.removeChild(item); 
}