document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    const townInput = document.getElementById("townInput");
    const searchBtn = document.getElementById("searchBtn");
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");


    let angle = 0;
    let currentIndex = 0;

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


   function updateCarousel() {
    const cards = carousel.querySelectorAll(".card");
    const numberOfCards = cards.length;
    const angleIncrement = 360 / numberOfCards;

    cards.forEach((card, i) => {
        const angleDeg = i * angleIncrement;
        card.style.transform = `rotateY(${angleDeg}deg) translateZ(300px)`;
    });

    // Rotate the carousel itself
    carousel.style.transform = `rotateY(${-currentIndex * angleIncrement}deg)`;
}
   
  // previous and next button

  prevBtn.addEventListener("click", () => {
    const cards = carousel.querySelectorAll(".card");
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    const cards = carousel.querySelectorAll(".card");
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});
    

});
