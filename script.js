document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    const townInput = document.getElementById("townInput");
    const searchBtn = document.getElementById("searchBtn");
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carousel2 = document.getElementById("carousel2");
    const prevBtn2 = document.getElementById("prevBtn2");
    const nextBtn2 = document.getElementById("nextBtn2");

    let currentIndex = 0;
    let currentIndex2 = 0;

    //API 
    const API_KEY = "7b4a13ac9e2a79595d77b0b3f3199067"; 
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    const dayVideo = "videos/daySky.mp4";
    const nightVideo = "videos/nightSky.mp4"
   

    // gets the current hour
    const currentHour = new Date().getHours();

    // if hour is between 7am & 7pm (dayVideo) otherwise (nightVideo)
   videoSource.src = (currentHour >= 7 && currentHour < 19) ? dayVideo : nightVideo;
   videoElement.load();

    // List of UK towns to preload in the carousel
    const towns = [
    "London", "Chelmsford", "Braintree", "Colchester",
     "Mersea Island", "BrightlingSea", "Witham", "Maldon", "Great Dunmow"
  ];
  
  // Preload weather cards for each town
  (async function preloadTowns() {
    for (const town of towns) {
      await fetchWeather(town);
      await new Promise(resolve => setTimeout(resolve, 500)); // delay to avoid API spam
    }
  })();
  
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

    function displayWeather(data) {
        console.log("Displaying card for:", data.name);
        const { name, main, weather } = data;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${name}</h2>
            <p>${main.temp}°C</p>
            <p>${weather[0].description}</p>
        `;

        carousel.appendChild(card);
        updateCarousel();
    }

    searchBtn.addEventListener("click", function () {
        if (townInput.value) fetchWeather(townInput.value);
    });

    fetchWeather("Witham");

    function updateCarousel() {
        const cards = carousel.querySelectorAll(".card");
        const numberOfCards = cards.length;
        const angleIncrement = numberOfCards > 1 ? 360 / numberOfCards : 0;

        cards.forEach((card, i) => {
            const angleDeg = i * angleIncrement;
            card.style.transform = `rotateY(${angleDeg}deg) translateZ(300px)`;
        });
        
        if (numberOfCards > 1) {
            carousel.style.transform = `rotateY(${-currentIndex * angleIncrement}deg)`;
        } else {
            carousel.style.transform = "rotateY(0deg)";
        }
    }

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


