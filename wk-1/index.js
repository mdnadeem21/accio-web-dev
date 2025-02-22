
const startTimerButton = document.getElementById('start-timer');
const timersList = document.getElementById('timers-list');
const completedTimers = document.getElementById('completed-timers');
let timers = [];

startTimerButton.addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalTime = (hours * 3600) + (minutes * 60) + seconds;

  if (totalTime <= 0) {
    alert('Please enter a valid time.');
    return;
  }

  const timer = {
    id: Date.now(),
    timeLeft: totalTime,
    interval: null
  };

  timers.push(timer);
  renderTimers();
  startCountdown(timer);
});

function startCountdown(timer) {
  timer.interval = setInterval(() => {
    timer.timeLeft--;

    if (timer.timeLeft <= 0) {
      clearInterval(timer.interval);
      timerEnded(timer);
    }

    renderTimers();
  }, 1000);
}

function renderTimers() {
  timersList.innerHTML = '';
  completedTimers.innerHTML = '';

  timers.forEach(timer => {
    const timerItem = document.createElement('div');
    timerItem.classList.add('timer-item');

    if (timer.timeLeft <= 0) {
      timerItem.classList.add('ended');
      timerItem.innerHTML = `
        <span>Timer Ended</span>
      `;
      completedTimers.appendChild(timerItem);
    } else {
      const timeLeft = formatTime(timer.timeLeft);
      timerItem.innerHTML = `
        <span class="time-left">${timeLeft}</span>
        <button onclick="stopTimer(${timer.id})">Stop Timer</button>
      `;
      timersList.appendChild(timerItem);
    }
  });
}

function stopTimer(id) {
  const timerIndex = timers.findIndex(timer => timer.id === id);
  if (timerIndex !== -1) {
    clearInterval(timers[timerIndex].interval);
    timers.splice(timerIndex, 1);
    renderTimers();
  }
}

function timerEnded(timer) {
  const audio = new Audio('alert.mp3'); // Add an audio file for the alert
  audio.play();
  renderTimers();
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}