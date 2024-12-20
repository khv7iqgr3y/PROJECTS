async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'b4649b525a14883ed3d5a2bcba89566c'; 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch 5-day forecast data
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (forecastData.cod === "200") {
            let forecastHTML = `<h3>:</h3><div id="forecastResult">`;
          // Start flex container
            forecastData.list.forEach((item, index) => {
                if (index % 8 === 0) { 
                    forecastHTML += `
                        <div class="forecast-item">
                            <h4>${new Date(item.dt * 1000).toLocaleDateString()}</h4>
                            <p>Temp: ${item.main.temp} °C</p>
                            <p>${item.weather[0].description}</p>
                            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon" />
                        </div>
                    `;
                }
            });
            forecastHTML += `</div>`;
            document.getElementById('forecastResult').innerHTML = forecastHTML;
        } else {
            document.getElementById('forecastResult').innerHTML = `<p>City not found!</p>`;
        }

        // Save search to history
        saveSearchHistory(city);
    } catch (error) {
        document.getElementById('forecastResult').innerHTML = `<p>Error fetching data!</p>`;
    }
}

function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Check if city is already in the history to avoid duplicates
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    displaySearchHistory();
}

function displaySearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyList = document.getElementById('searchHistory');
    historyList.innerHTML = '';

    history.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.onclick = () => {
            document.getElementById('cityInput').value = city;
            getWeather();
        };
        historyList.appendChild(listItem);
    });
}

// Load history on page load
document.addEventListener('DOMContentLoaded', displaySearchHistory);
