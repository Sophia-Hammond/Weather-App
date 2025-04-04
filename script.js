document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    const townInput = document.getElementById("townInput");
    const searchBtn = document.getElementById("searchBtn");
    const carousel = document.getElementById("carousel");


    //API 
    const API_KEY = "the api key"; // https://home.openweathermap.org/api_keys
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    
    
    //video source
    const dayVideo = "videos/daySky.mp4";
    const nightVideo = "videos/nightSky.mp4"

    // gets the current hour
    const currentHour = new Date().getHours();

    // if hour is between 7am & 7pm (dayVideo) otherwise (nightVideo)
    if (currentHour >= 7 && currentHour < 19) {
        videoSource.src = dayVideo;
    } else {
        videoSource.src = nightVideo;
    }

    videoElement.load()

    // Fetch weather data

    async function fetchWeather(town) {
        try {
            const response = await fetch(`${BASE_URL}?q=${town}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error("Town not found");

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
            weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
         }
    }

    // display fetched weather data
    function displayWeather(data) {
        const { name, main, weather } = data;
        weatherContainer.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>condition: ${weather[0].description}</p>;
    `}

    // search for town weather 
    document.getElementById("search-btn").addEventListener("click", function () {
        const town = document.getElementById("town-input").value 
        if (townInput.value) fetchWeather(townInput.value);

    });

    // get weather for a default town
    fetchWeather("Witham");
});
