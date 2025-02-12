const apiKey = "1fef8eea30e8fe3405186d7667cd9f85";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput")
const searchbutton = document.getElementById("searchBtn")
const city = document.getElementById("city")
const country = document.getElementById("country")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("windSpeed")
const pressure = document.getElementById("pressure")
const weatherIcon = document.getElementById("weatherIcon")


searchbutton.addEventListener("click", ()=>{
    const cityName = cityInput.value;
    
    if(cityName === ""){
        alert("Please enter city name")
        return;
    }
    getWeatherData(cityName)
})

async function getWeatherData(cityName) {
    const url = `${apiUrl}${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if(response.ok){
        updateWeather(data);
    } else{
        alert("City not found. Please try again.");
    }
}

function updateWeather(data) {
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity + "%  "
    windSpeed.textContent = data.wind.speed + "m/s  "
    pressure.textContent = data.main.pressure + "hPa  "
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
}


