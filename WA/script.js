async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'b4649b525a14883ed3d5a2bcba89566c'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weather = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('weatherResult').innerHTML = weather;
        } else {
            document.getElementById('weatherResult').innerHTML = `<p>City not found!</p>`;
        }
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p>Error fetching data!</p>`;
    }
}
