
const apiKey = '73e532cc871ad9c2dc8f03baa837462c';

const weatherContainer = document.getElementsById("weather");
const city = document.getElementsById("city");
const error = document.getElementsById("weather");

const units = 'metric' 


async function weatherInfo() {
   try{
    weatherContainer.innerHTML = '';
    error.innerHTML = '';
    city.innerHTML = '';

    const cnt = 10;
    const cityInput = document.getElementById('city').value;

    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=${units}&cnt=${cnt}`;

    const response = await fetch(weatherApi);
    const data = await response.json();
    console.log(data);

    displayWeather(data);

    if (data.cod =='400' || data.cod == '404' ) {
        error.innerHTML = `You haven't entered a valid city. Please Try Again !`
    }







   }
    


}