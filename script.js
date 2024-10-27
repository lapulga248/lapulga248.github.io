// This code retrieves an HTML Element by its ID of countrycity_input using document.getElementById.
const countrycityInput = document.getElementById('countrycity_input');

// This code retrieves an HTML Element by its ID of checkweatherBtn using document.getElementById.
const checkweatherBtn = document.getElementById('checkweatherBtn');

// This code is the OpenWeatherMap API Key that can access to the OpenWeatherMap service.
const apiKey = '9672eb7d4fd80e69190c786a1f4332a0';

// This code uses the document.querySelectorAll to select all the elements that match the CSS Selector which is the .weatherLeft & .cardToday. The [0] is used to find the first element only. 
const weatherCurrentData = document.querySelectorAll('.weatherLeft .cardToday')[0];

// This code uses the document.querySelectorAll to select all the elements that match the CSS Selector which is the .weatherRight & .weatherHighlights. The [0] is used to find the first element only.
const highlightsCurrentData = document.querySelectorAll('.weatherRight .weatherHighlights')[0];

// This code defines the first function called checkWeatherData that has four parameters which will be used to display current weather information. 
function checkWeatherData(name, lat, lon, country){ 

	// This is the URL of OpenWeatherMap Current Weather API to fetch current weather of the city like temperature or humidity based on latitude and longitude.
	const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	// Two arrays that contains the days of the week & months of the year which will be used to format the date when displaying weather information.		
	const currentDays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const currentMonths = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

	// This fetch code sends a GET request to the OpenWeatherMap Current Weather API using the URL and the response is converted into a JSON Format. 
	fetch(weatherApiURL).then(res => res.json()).then(data => { 

		// This code creates a date object that represents the current date and time to display today's date in the weather information.
		const currentDate = new Date(); 

		// When current weather data is retrieved, the weatherCurrentData updates the contents of the HTML codes inside it.
		// The information contains the current temperature, weather description, icons that represents the current weather, and the city & country name.
		// The data.main.temp is retrieved from the API response and it uses kelvin then converting it to celsius using -273.15 and toFixed(0) to fix the decimal of the temperature.
		// The data.weather[0].description is retrieved from the API Response to get the Current Weather Description like Cloudy or Rainy.
		// The data.weather[0].icon is retrieved from the API Response to match the weather icon to the weather description and its based on the icon code from the API Response.
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
		// When current weather data is retrieved, the highlightsCurrentData updates the contents of the HTML codes inside it.
		// The highlights contains the current humidity and windspeed.
		// The data.main.humidity is retrieved from the API response to get the current humidity of the city based on what the user input.
		// The data.wind.speed is retrieved from the API response to get the current windspeed of the city based on what the user input.
		highlightsCurrentData.innerHTML = ` 
            <div class="cardHumidity">
                <div class="cardHead">
                    <p>Humidity</p>
                </div>
                <div class="cardItem">
                    <i class="fa-light fa-droplet fa-3x"></i>
                    <h2 id="humidityValue">${data.main.humidity}%</h2>
                </div>
            </div>
            <div class="cardwindSpeed">
            	<div class="cardHead">
                    <p>Wind Speed</p>
                </div>
               	<div class="cardItem">
                    <i class="fa-light fa-location-arrow fa-3x"></i>
                    <h2 id="windspeedValue">${data.wind.speed}m/s</h2>
                </div>
            </div>
		`; 
		// If the fetch request fails, this catch code then displays the alert code message inside it.
	}).catch(() => {
		alert('Failed to Fetch The Current Weather'); 
	});
}

// This code defines the second function called checkCountryCityData that executes when the checkweatherBtn is clicked. 
function checkCountryCityData(){ 

	// This code gets the value of what country/city entered by the user and the trim code removes any whitespace or extra space on it.
	const countrycityName = countrycityInput.value.trim(); 

	// This code clears the input field to ensure that the input by the user has been processed already. 
	countrycityInput.value = ''; 

	// This code do if the user did not enter any value to the input field, this whole function code will return/exits early and no code will run.
	if(!countrycityName) return; 

	// This is the URL of OpenWeatherMap Geocoding API to fetch geographic coordinates of the city based on what the user input.
	const geocodingApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${countrycityName}&limit=1&appid=${apiKey}`; 

	// This fetch code sends a GET request to the OpenWeatherMap Geocoding API using the URL and the response is converted into a JSON Format. 
	fetch(geocodingApiURL).then(res => res.json()).then(data => { 

		// Once the data is retrieved, This code extracts specific properties which is the four parameters from the first object of the returned data array [0].
		const {name, lat, lon, country} = data[0]; 

		// When the data is extracted specifically, This code calls the function checkWeatherData with the extracted data and display the current weather information.
		checkWeatherData(name, lat, lon, country); 

		// If the fetch request fails, this catch code then displays the alert code message inside it.
	}).catch(() => {
		alert(`Failed to Fetch The Coordinates of ${countrycityName}`); 
	});
}

// This code has an event listener and when the button is clicked, it calls the function checkCountryCityData.
checkweatherBtn.addEventListener('click', checkCountryCityData); 
