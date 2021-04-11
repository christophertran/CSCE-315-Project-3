function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].toUpperCase().includes(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var senators = ["Richard Shelby   -   Alabama",
"Tommy Tuberville   -   Alabama",
"Lisa Murkowski   -   Alaska",
"Dan Sullivan   -   Alaska",
"Kyrsten Sinema   -   Arizona",
"Mark Kelly   -   Arizona",
"John Boozman   -   Arkansas",
"Tom Cotton   -   Arkansas",
"Dianne Feinstein   -   California",
"Alex Padilla   -   California",
"Michael Bennet   -   Colorado",
"John Hickenlooper   -   Colorado",
"Richard Blumenthal   -   Connecticut",
"Chris Murphy   -   Connecticut",
"Tom Carper   -   Delaware",
"Chris Coons   -   Delaware",
"Marco Rubio   -   Florida",
"Rick Scott   -   Florida",
"Jon Ossoff   -   Georgia",
"Raphael Warnock   -   Georgia",
"Brian Schatz   -   Hawaii",
"Mazie Hirono   -   Hawaii",
"Mike Crapo   -   Idaho",
"Jim Risch   -   Idaho",
"Dick Durbin   -   Illinois",
"Tammy Duckworth   -   Illinois",
"Todd Young   -   Indiana",
"Mike Braun   -   Indiana",
"Chuck Grassley   -   Iowa",
"Joni Ernst   -   Iowa",
"Jerry Moran   -   Kansas",
"Roger Marshall   -   Kansas",
"Mitch Mcconnell   -   Kentucky",
"Rand Paul   -   Kentucky",
"Bill Cassidy   -   Louisiana",
"John Kennedy   -   Louisiana",
"Susan Collins   -   Maine",
"Angus King   -   Maine",
"Ben Cardin   -   Maryland",
"Chris Van Hollen   -   Maryland",
"Elizabeth Warren   -   Massachusetts",
"Ed Markey   -   Massachusetts",
"Debbie Stabenow   -   Michigan",
"Gary Peters   -   Michigan",
"Amy Klobuchar   -   Minnesota",
"Tina Smith   -   Minnesota",
"Roger Wiker   -   Mississippi",
"Cindy Hyde-Smith   -   Mississippi",
"Roy Blunt   -   Missouri",
"Josh Hawley   -   Missouri",
"John Tester   -   Montana",
"Steve Daines   -   Montana",
"Deb Fischer   -   Nebraska",
"Ben Sasse   -   Nebraska",
"Catherine Cortez Masto   -   Nevada",
"Jacky Rosen   -   Nevada",
"Jeanne Shaheen   -   New Hampshire",
"Maggie Hassan   -   New Hampshire",
"Bob Menedez   -   New Jersey",
"Cory Booker   -   New Jersey",
"Martin Heinrich   -   New Mexico",
"Ben Ray Lujan   -   New Mexico",
"Chuck Schumer   -   New York",
"Kirsten Gillibrand   -   New York",
"Richard Burr   -   North Carolina",
"Thom Tillis   -   North Carolina",
"John Hoeven   -   North Dakota",
"Kevin Cramer   -   North Dakota",
"Sherrod Brown   -   Ohio",
"Rob Portman   -   Ohio",
"Jim Inhofe   -   Oklahoma",
"James Lankford   -   Oklahoma",
"Ron Wyden   -   Oregon",
"Jeff Merkley   -   Oregon",
"Bob Casey Jr.   -   Pennsylvania",
"Pat Toomey   -   Pennsylvania",
"Jack Reed   -   Rhode Island",
"Sheldon Whitehouse   -   Rhode Island",
"Lindsey Graham   -   South Carolina",
"Tim Scott   -   South Carolina",
"John Thune   -   South Dakota",
"Mike Rounds   -   South Dakota",
"Marsha Blackburn   -   Tennessee",
"Bill Hagerty   -   Tennessee",
"John Cornyn   -   Texas",
"Ted Cruz   -   Texas",
"Mike Lee   -   Utah",
"Mitt Romney   -   Utah",
"Patrick Leahy   -   Vermont",
"Bernie Sanders   -   Vermont",
"Mark Warner   -   Virginia",
"Tim Kaine   -   Virginia",
"Patty Murray   -   Washington",
"Maria Cantwell   -   Washington",
"Joe Manchin   -   West Virginia",
"Shelley Moore Capito   -   West Virginia",
"Ron Johnson   -   Wisconsin",
"Tammy Baldwin   -   Wisconsin",
"John Barrasso   -   Wyoming",
"Cynthia Lummis   -   Wyoming"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), senators);