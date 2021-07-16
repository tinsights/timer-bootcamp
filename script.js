const mainContainer = document.createElement('div');
const leftContainer = document.createElement('div');
const rightContainer = document.createElement('div');
const lapTimeDisplay = document.createElement('div');
const elapsedTimeDisplay = document.createElement('div');
const startButton = document.createElement('button');
const lapButton = document.createElement('button');
const splitTime = document.createElement('p');
const totalTime = document.createElement('p');

// startButton.innerText = 'Start';
// stopButton.innerText = 'Stop';
// resetButton.innerText = 'Reset';
// lapButton.innerText = 'Lap';

mainContainer.id = 'main-container';

leftContainer.className = 'left';
lapTimeDisplay.classList.add('container', 'lap-time');
rightContainer.className = 'right';
elapsedTimeDisplay.classList.add('container', 'elapsed-time');
startButton.classList.add('start', 'button');
lapButton.classList.add('lap', 'button');
totalTime.className = 'running-time';
splitTime.className = 'running-lap-time';

elapsedTimeDisplay.appendChild(totalTime);
elapsedTimeDisplay.appendChild(splitTime);

leftContainer.appendChild(lapTimeDisplay);
rightContainer.appendChild(elapsedTimeDisplay);
rightContainer.appendChild(startButton);
rightContainer.appendChild(lapButton);
mainContainer.appendChild(leftContainer);
mainContainer.appendChild(rightContainer);
document.body.appendChild(mainContainer);

let totalElapsedTime = 0;
let lapCounter = 0;
const splitTimes = [0];
let running = false;
let timer;
let lapTimer;

splitTime.innerText = '00:00:00';
totalTime.innerText = '00:00:00';

startButton.addEventListener('click', () => {
  if (running) {
    clearInterval(timer);
    clearInterval(lapTimer);
    running = false;
    return;
  }
  running = true;
  timer = setInterval(() => {
    totalElapsedTime += 1;
    const hours = Math.floor(totalElapsedTime / 3600);
    const minutes = Math.floor(totalElapsedTime / 60);
    totalTime.innerText = `${Math.floor(hours / 10)}${hours % 10}:${Math.floor(minutes / 10) % 6}${minutes % 10}:${Math.floor((totalElapsedTime / 10) % 6)}${Math.floor(totalElapsedTime % 10)}`;
  }, 1000);
  lapTimer = setInterval(() => {
    const hours = Math.floor((totalElapsedTime - splitTimes[lapCounter]) / 3600);
    const minutes = Math.floor((totalElapsedTime - splitTimes[lapCounter]) / 60);
    splitTime.innerText = `${Math.floor(hours / 10)}${hours % 10}:${Math.floor(minutes / 10) % 6}${minutes % 10}:${Math.floor(((totalElapsedTime - splitTimes[lapCounter]) / 10) % 6)}${Math.floor((totalElapsedTime - splitTimes[lapCounter]) % 10)}`;
  }, 1000);
});

lapButton.addEventListener('click', () => {
  if (!running) {
    totalElapsedTime = 0;
    splitTime.innerText = '00:00:00';
    totalTime.innerText = '00:00:00';
    while (lapTimeDisplay.lastChild) {
      lapTimeDisplay.lastChild.remove();
    }
    clearInterval(timer);
    splitTimes.length = 1;
    lapCounter = 0;
    return;
  }
  lapCounter += 1;
  splitTime.innerText = '00:00:00';
  splitTimes.push(totalElapsedTime);
  const thisLapTime = splitTimes[lapCounter] - splitTimes[lapCounter - 1];
  const recordedTime = document.createElement('p');

  const lapHours = Math.floor(thisLapTime / 3600);
  const lapMinutes = Math.floor(thisLapTime / 60);

  const lapTimeToDisplay = `${lapCounter}: ${Math.floor(lapHours / 10)}${lapHours % 10}:${Math.floor(lapMinutes / 10) % 6}${lapMinutes % 10}:${Math.floor((thisLapTime / 10) % 6)}${Math.floor(thisLapTime % 10)}`;

  const hours = Math.floor(totalElapsedTime / 3600);
  const minutes = Math.floor(totalElapsedTime / 60);
  const splitTimeToDisplay = `${Math.floor(hours / 10)}${hours % 10}:${Math.floor(minutes / 10) % 6}${minutes % 10}:${Math.floor((totalElapsedTime / 10) % 6)}${Math.floor(totalElapsedTime % 10)}`;

  recordedTime.innerHTML = `Lap ${lapTimeToDisplay} || ${splitTimeToDisplay}`;
  lapTimeDisplay.appendChild(recordedTime);
});
