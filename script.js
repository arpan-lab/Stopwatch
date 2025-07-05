let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function timeToString(time) {
  const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  const ms = String(time % 1000).padStart(3, '0');
  return `${hrs}:${mins}:${secs}:${ms}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = timeToString(elapsedTime);
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 50);
  }
}

function stop() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00:000";
  lapsList.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapItem = document.createElement("li");
    const lapNumber = lapsList.children.length + 1;
    lapItem.textContent = `Lap ${lapNumber}: ${timeToString(elapsedTime)}`;
    lapsList.appendChild(lapItem);
  }
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("stopBtn").addEventListener("click", stop);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", recordLap);
