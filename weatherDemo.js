document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('get-weather-button');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');

    getWeatherButton.addEventListener('click', weatherInfo);

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            weatherInfo()
        }
    });

    async function weatherInfo() {
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        const apiKey = '73e532cc871ad9c2dc8f03baa837462c' // 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Try - catch statement . tests for errors . catch is executed when error is found 

        try {
            const response = await fetch(apiUrl);
            // makes a HTTP request to the apiurl
            if (!response.ok) {
                throw new Error('City not found');
                // response is an object that contains info on the HTTP response 
                // here checking if repsonse is okay ("cod" outside range of 200-299)
            }
            const data = await response.json();
            // parsed JSON object stored here 
            
            displayWeather(data);
            // stores the json response from the weather API.
        } catch (error) {
            alert(error.message);
            // alert the user that an error has been found .
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <p><strong>City:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${main.temp} °C</p>
            <p><strong>Feels like:</strong> ${main.feels_like} °C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Weather:</strong> ${weather[0].description}</p>`;
    } //temperature and humidity are both properties nested within the "main" property

    // The weather[0] is used as it gives multiple weather conditions sometimes so this ensures that the first one is used
});