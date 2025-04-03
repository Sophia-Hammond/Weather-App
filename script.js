document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");

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
})