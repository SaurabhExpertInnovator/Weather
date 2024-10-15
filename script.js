const apiKey = '1fb0c21b78a51b5f5bd30bc4d16d0eb1'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');

getWeatherButton.addEventListener('click', () => {
    const city = document.getElementById('city').value;

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const icon = data.weather[0].icon;
                weatherResult.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                    <p>Temperature: ${temperature} °C</p>
                    <p>Description: ${weatherDescription}</p>
                `;
            })
            .catch(error => {
                weatherResult.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    }
});

