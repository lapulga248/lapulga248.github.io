// let is used to declare a variable in javascript.
// This code retrieves an HTML Element by its ID of countrycity_input using document.getElementById.
let countrycityInput = document.getElementById('countrycity_input'), 

// This code retrieves an HTML Element by its ID of checkweatherBtn using document.getElementById.
checkweatherBtn = document.getElementById('checkweatherBtn'),

// This code is the OpenWeatherMap API Key that can access to the OpenWeatherMap service.
apiKey = '9672eb7d4fd80e69190c786a1f4332a0', 

// This code uses the document.querySelectorAll to select all the elements that match the CSS Selector which is the .weatherLeft & .cardToday. The [0] is used to find the first element only. 
weatherCurrentData = document.querySelectorAll('.weatherLeft .cardToday')[0], 

// This code retrieves an HTML Element by its ID of humidityValue using document.getElementById.
humidityValue = document.getElementById('humidityValue'), 

// This code retrieves an HTML Element by its ID of windspeedValue using document.getElementById.
windspeedValue = document.getElementById('windspeedValue'); 

// This code defines the first function called checkWeatherData that has five parameters which will be used to display current weather information. 
function checkWeatherData(name, lat, lon, country, state){ 

	// This is the URL of OpenWeatherMap API for the fetch request. 
	let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, 

	// Two arrays that contains the days of the week & months of the year which will be used to format the date when displaying weather information.
	currentDays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	currentMonths = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

	// This fetch code sends a GET request to the OpenWeatherMap API using the URL and the response is converted into a JSON Format. 
	fetch(weatherApiURL).then(res => res.json()).then(data => { 

		// This code creates a date object that represents the current date and time to display today's date in the weather information.
		let currentDate = new Date(); 

		// When current weather data is retrieved, the weatherCurrentData updates the contents of the HTML codes inside it.
		// The information contains the current temperature, weather description, icons that represents the current weather, current date and time, and the city & country name.
		// The data.main.temp is retrieved from the API response and it uses kelvin then converting it to celsius using -273.15 and toFixed(0) to fix the decimal of the temperature.
		// The data.weather[0].description is retrieved from the API Response.
		// The data.weather[0].icon is retrieved from the API Response and its based on the icon code from the API Response.
		// The Date is formatted using the two arrays of days and months and showing the current day, date, month and year.
		// The city and country name is also displayed.
		weatherCurrentData.innerHTML = ` 
			<div class="weatherCurrent">
				<div class="todayDetails">
					<p>Today</p>
					<h2>${(data.main.temp - 273.15).toFixed(0)}&deg;C</h2>
					<p>${data.weather[0].description}</p>
				</div>
					<div class="weatherIcon">
						<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"  alt="">
					</div>
			</div>
			<hr>
			<div class="todayBottom">
				<p><i class="fa-light fa-calendar"></i> ${currentDays[currentDate.getDay()]}, ${currentMonths[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}</p>
				<p><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
			</div>
		`; 

		// This code uses the destructuring technique which is to only get the humidity from the data.main & windspeed from the data.wind specifically from the API Response.
		let {humidity} = data.main, 
		{speed} = data.wind; 

		// This code updates the HTML Contents of humidityValue & windspeedValue elements to display the current humidity's percentage & windspeed's meters per second.
		humidityValue.innerHTML = `${humidity}%`; 
		windspeedValue.innerHTML = `${speed}m/s`; 

		// If the fetch request fails, this catch code then displays the alert code message inside it.
	}).catch(() => {
		alert('Failed to fetch current weather'); 
	});
}

// This code defines the second function called checkCountryCityData that executes when the checkweatherBtn is clicked. 
function checkCountryCityData(){ 

	// This code gets the value of what country/city entered by the user and the trim code removes any whitespace or extra space on it.
	let countrycityName = countrycityInput.value.trim(); 

	// This code clears the input field to ensure that the input by the user has been processed already. 
	countrycityInput.value = ''; 

	// This code do if the user did not enter any value to the input field, this whole function code will return/exits early and no code will run.
	if(!countrycityName) return; 

	// This is the URL of Geocoding API to fetch geographic coordinates of the city based on what the user input.
	let geocodingApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${countrycityName}&limit=1&appid=${apiKey}`; 

	// This fetch code sends a GET request to the OpenWeatherMap Geocoding API using the URL and the response is converted into a JSON Format. 
	fetch(geocodingApiURL).then(res => res.json()).then(data => { 

		// Once the data is retrieved, This code extracts specific properties which is the five parameters from the first object of the returned data array [0].
		let {name, lat, lon, country, state} = data[0]; 

		// When the data is extracted specifically, This code calls the function checkWeatherData with the extracted data and display the current weather information.
		checkWeatherData(name, lat, lon, country, state); 

		// If the fetch request fails, this catch code then displays the alert code message inside it.
	}).catch(() => {
		alert(`Failed to fetch coordinates of ${countrycityName}`); 
	});
}

// This code has an event listener and when the button is clicked, it calls the function checkCountryCityData.
checkweatherBtn.addEventListener('click', checkCountryCityData); 
