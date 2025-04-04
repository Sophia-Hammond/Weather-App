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
   videoSource.src = (currentHour >= 7 && currentHour < 19) ? dayVideo : nightVideo;
   videoElement.load();

    // Fetch weather data

    async function fetchWeather(town) {
        try {
            const response = await fetch(`${BASE_URL}?q=${town}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error("Town not found");

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
            alert(`Error: ${error.message}`);
         }
    }

    // display fetched weather data
    function displayWeather(data) {
        const { name, main, weather } = data;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${name}</h2>
            <p>${main.temp}°C</p>
            <p>${weather[0].description}</p>`;
            
            carousel.appendChild(card);

            updateCarousel(); 
    }

   // Search button click
   searchBtn.addEventListener("click", function () {
    if (townInput.value) fetchWeather(townInput.value);
});

   // Load default town
   fetchWeather("Witham");

   // Placeholder
   function updateCarousel() {
    

});
