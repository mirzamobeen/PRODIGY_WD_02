let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

// Fallback for browsers without Audio support
const startSound = typeof Audio !== "undefined" ? new Audio('https://www.soundjay.com/button/sounds/button-6.mp3') : null;
const pauseSound = typeof Audio !== "undefined" ? new Audio('https://www.soundjay.com/button/sounds/button-3.mp3') : null;
const resetSound = typeof Audio !== "undefined" ? new Audio('https://www.soundjay.com/button/sounds/button-4.mp3') : null;
const lapSound = typeof Audio !== "undefined" ? new Audio('https://www.soundjay.com/button/sounds/button-16.mp3') : null;

function startTimer() {
    if (!running) {
        if (startSound) startSound.play();  // Play start sound if supported
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        if (pauseSound) pauseSound.play();  // Play pause sound if supported
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    if (resetSound) resetSound.play();  // Play reset sound if supported
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    laps = [];
    updateLaps();
}

function lapTimer() {
    if (running) {
        if (lapSound) lapSound.play();  // Play lap sound if supported
        laps.push(display.innerHTML);
        updateLaps();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    display.innerHTML = formattedTime;
}

function pad(num) {
    return (num < 10 ? "0" : "") + num;
}

function updateLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

// Event listeners for buttons
document.getElementById("startBtn").onclick = startTimer;
document.getElementById("pauseBtn").onclick = pauseTimer;
document.getElementById("resetBtn").onclick = resetTimer;
document.getElementById("lapBtn").onclick = lapTimer;
