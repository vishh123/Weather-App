const apiKey = "1fef8eea30e8fe3405186d7667cd9f85";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchBtn");
const city = document.getElementById("city");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }
    getWeatherData(cityName);
});

async function getWeatherData(cityName) {
    const currentWeatherUrl = `${apiUrl}${cityName}&appid=${apiKey}`;
    const forecastUrl = `${forecastApiUrl}${cityName}&appid=${apiKey}`;

    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();

        if (currentWeatherResponse.ok && forecastResponse.ok) {
            updateWeather(currentWeatherData);
            updateForecast(forecastData);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again later.");
    }
}

function updateWeather(data) {
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity + "%";
    windSpeed.textContent = data.wind.speed + "m/s";
    pressure.textContent = data.main.pressure + "hPa";
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    const dailyData = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyData[date] && item.dt_txt.includes("12:00:00")) {
            dailyData[date] = item;
        }
    });

    Object.values(dailyData).slice(0, 5).forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-item");

        dayElement.innerHTML = `
            <p>${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].description}</p>
        `;

        forecastContainer.appendChild(dayElement);
    });
}


