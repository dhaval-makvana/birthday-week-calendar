var listState = [
    {
        day: 'Mon',
        names: []
    },
    {
        day: 'Tue',
        names: []
    },
    {
        day: 'Wed',
        names: []
    },
    {
        day: 'Thu',
        names: []
    },
    {
        day: 'Fri',
        names: []
    },
    {
        day: 'Sat',
        names: []
    },
    {
        day: 'Sun',
        names: []
    },
];
var yearState = "";
var textAreaState = "";

function createWebApp(listState) {
	var rootDiv = document.getElementById("root");
	rootDiv.classList.add("app");

	var h1 = document.createElement("h1");
	h1.innerHTML = "Birthday Calendar";
    h1.classList.add("h1");
    h1.id = '1-h1';

	var calendarDiv = createCalendar(listState);
    var dataDiv = createDatadiv();

	rootDiv.appendChild(h1);
	rootDiv.appendChild(calendarDiv);
    rootDiv.appendChild(dataDiv);
}

function createCalendar(list) {
	var calendarDiv = document.createElement("div");
    calendarDiv.classList.add("calendar");
    calendarDiv.id = '2-calendar'

	for (let i = 0; i < list.length; i++) {
        // console.log(i);
		// create day div
		const day = list[i].day;
        const names = list[i].names;
        // console.log("calendar", day, names);
        const dayDivs = createDayDiv(day, names);
        // console.log("div",dayDivs);
		calendarDiv.appendChild(dayDivs);
    }
    
    console.log("after day divs",calendarDiv);

	return calendarDiv;
}

function createDayDiv(day, names) {

	var dayDiv = document.createElement("div");
	dayDiv.classList.add("day");

	var dayHeading = document.createElement("div");
	dayHeading.classList.add("day-heading");
    dayHeading.innerHTML = day;

	var dayContent = document.createElement("div");
	dayContent.classList.add("day-content");

	if (names.length === 0) {
		var emptyDiv = document.createElement("div");
		emptyDiv.classList.add("day-empty");

		dayContent.appendChild(emptyDiv);
	} else {
		var birthdayDivs = createBirthdayDivs(names);
		dayContent.appendChild(birthdayDivs);
    }

	dayDiv.appendChild(dayHeading);
    dayDiv.appendChild(dayContent);

	return dayDiv;
}

function createBirthdayDivs(names) {
	var birthdayDiv = document.createElement("div");
	birthdayDiv.classList.add("day-content");

    var widthMaker = Math.ceil(Math.sqrt(names.length));
    
    console.log("width", widthMaker);
    console.log("actual width", 100/ widthMaker);
    var width = 100/ widthMaker;
    width = width.toFixed(2);

	for (let i = 0; i < names.length; i++) {
		const randomColor = Math.floor(Math.random() * 9);
		var initialDiv = document.createElement("div");
		const colorClass = `color-${randomColor}`;

        initialDiv.classList.add(colorClass);
        initialDiv.classList.add('initial-div');
        initialDiv.style.width = `${width}%`;
		initialDiv.style.height = `${width}%`;
		initialDiv.innerText = names[i].name;
		birthdayDiv.appendChild(initialDiv);
	}

	return birthdayDiv;
}

function createDatadiv() {
	var dataDiv = document.createElement("div");
    dataDiv.classList.add("data-div");
    dataDiv.id = '3-data-div';

	var textArea = document.createElement("textarea");
	textArea.classList.add("textarea");
	textArea.addEventListener("change", function(event) {
		textAreaState = event.target.value;
	});

	var filterDiv = document.createElement("div");
	filterDiv.classList.add("filter-div");

	var h6 = document.createElement("h6");
	h6.classList.add("h6");
	h6.innerText = "Year";

	var yearInput = document.createElement("input");
	yearInput.type = "number";
	yearInput.classList.add("input-number");
	yearInput.name = "year";
	yearInput.addEventListener("change", function(event) {
		yearState = event.target.value;
	});

	var button = document.createElement("button");
	button.classList.add("button");
	button.innerText = "Update";
	button.addEventListener("click", function(event) {

		let textarea = JSON.parse(window.textAreaState.toString());
		let year = window.yearState;

		if (textarea.constructor !== Array) {
			return "Please use an array of objects in JSON format as your input!";
		}

		// console.log(typeof textarea);
		// console.log(textarea.constructor);
		// console.log(textarea, year);

		let filteredArray = textarea.filter(d => {
			let birthday = d.birthday.split("/");
            let birthdayYear = birthday[2];
            let date = new Date(birthday[2], birthday[0] - 1, birthday[1])
			if (Number(birthdayYear) === Number(year)) {
				// console.log("b", birthdayYear);
				// console.log("y", year);
				return {
                    ...d,
                    date
                };
			}
		});

        console.log(filteredArray);
        filteredArray.sort((a, b) => {
            return b.date - a.date
        })
        console.log(filteredArray);

		filteredArray = filteredArray.map(d => {
			let tempObject = {};
			let birthday = d.birthday.split("/");
			let name = d.name.split(" ");
			let initials = [];

			for (let i = 0; i < name.length; i++) {
				initials.push(name[i][0]);
			}

			initials = initials.join("").toUpperCase();

			let birthDateObject = new Date(birthday[2], birthday[0] - 1, birthday[1]);

			// console.log(birthDateObject);

			let day = birthDateObject.getDay();

			if (day === 0) {
				day = "Sun";
			} else if (day === 1) {
				day = "Mon";
			} else if (day === 2) {
				day = "Tue";
			} else if (day === 3) {
				day = "Wed";
			} else if (day === 4) {
				day = "Thu";
			} else if (day === 5) {
				day = "Fri";
			} else if (day === 6) {
				day = "Sat";
			} else {
				console.log("Error");
			}

			tempObject.day = day;
			tempObject.name = initials;

			return tempObject;
		});

		// console.log(filteredArray, "initials");

		let dayObject = {
			Mon: [],
			Tue: [],
			Wed: [],
			Thu: [],
			Fri: [],
			Sat: [],
			Sun: []
		};

		filteredArray.map(d => {
			if (dayObject[d.day]) {
				dayObject[d.day].push(d);
			} else {
				dayObject[d.day] = [d];
			}
		});

		// console.log(dayObject);

		let dayArray = [];

		Object.entries(dayObject).map(d => {
			// console.log(d);
			// console.log(d[0]);
			// console.log(d[1]);

			dayArray.push({
				day: d[0],
				names: d[1]
			});
		});

		// console.log(dayArray);

		
        listState = dayArray;
        
        
        const calendar = createCalendar(listState);

        var rootDiv = document.getElementById("root");
        var oldCalendarDiv = document.getElementById('2-calendar');
        var currentDataDiv = document.getElementById('3-data-div');
        rootDiv.removeChild(oldCalendarDiv);
        rootDiv.insertBefore(calendar, currentDataDiv);
		
	});

	// console.log(button);

	filterDiv.appendChild(h6);
	filterDiv.appendChild(yearInput);
	filterDiv.appendChild(button);

	dataDiv.appendChild(textArea);
	dataDiv.appendChild(filterDiv);

	return dataDiv;
}

createWebApp(listState);


