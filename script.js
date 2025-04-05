document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    const townInput = document.getElementById("townInput");
    const searchBtn = document.getElementById("searchBtn");
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    const API_KEY = "7b4a13ac9e2a79595d77b0b3f3199067";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    const dayVideo = "videos/daySky.mp4";
    const nightVideo = "videos/nightSky.mp4";
    const currentHour = new Date().getHours();
    videoSource.src = (currentHour >= 7 && currentHour < 19) ? dayVideo : nightVideo;
    videoElement.load();

    const ukTowns = [
        "London", "Colchester", "Chelmsford", "Edinburgh", "Bristol",
        "Cardiff", "Leicester", "Nottingham", "Newcastle",
    ];

    ukTowns.forEach(town => fetchWeather(town));

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
        const angleIncrement = 360 / numberOfCards;

        cards.forEach((card, i) => {
            const angleDeg = i * angleIncrement;
            card.style.transform = `rotateY(${angleDeg}deg) translateZ(300px)`;
        });

        carousel.style.transform = `rotateY(${-currentIndex * angleIncrement}deg)`;
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
