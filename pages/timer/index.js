const sessionBtn = document.getElementById('sessionSetting');
const breakBtn = document.getElementById('breakSetting');
const longBreakBtn = document.getElementById('longBreakSetting');
const quantitySessionsBtn = document.getElementById('quantitySession');
const sessionModal = document.getElementById('sessionModal');
const breakModal = document.getElementById('breakModal');
const longBreakModal = document.getElementById('longBreakModal');
const quantitySessionsModal = document.getElementById('quantitySessionsModal');
const closeModalBtn = document.querySelectorAll('#closeModalbtn');
const minSessionInput = document.getElementById('minSession');
const minBreakInput = document.getElementById('minBreak');
const minLongBreakInput = document.getElementById('minLongBreak');
const quantitySessionsInput = document.getElementById('userSessionsQuantity');
const userSaveInputBtn = document.querySelectorAll('.saveTimeBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minText = document.getElementById('minText');
const secText = document.getElementById('secText');
const audioAuthorization = document.getElementById('audioAuthorization');

/* ========= TIMER ================*/

let timeSession = parseInt(minSessionInput.value) * 60000;
let timeBreak = parseInt(minBreakInput.value) * 60000;
let timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
let userSessionsQuantity = quantitySessionsInput.value;

minText.innerText = minSessionInput.value;

let sessionCounter = 1;
let interval;

function timerControl() {
  if (timeSession !== 0) {
    if (timeSession === 1000) {
      playAlarm();
      clearInterval(interval);
      startBtn.classList.remove('disabled');
    }
    if (timeSession === 1000 && sessionCounter < userSessionsQuantity) {
      timeBreak = parseFloat(minBreakInput.value) * 60000;
      sessionCounter++;
    }
    console.log('s');
    timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
    countdownSession();
  } else if (timeSession === 0 && timeBreak !== 0) {
    if (timeBreak === 1000) {
      playAlarm();
      clearInterval(interval);
      startBtn.classList.remove('disabled');
      timeSession = parseInt(minSessionInput.value) * 60000;
    }
    console.log('b');
    countdownBreak();
  } else if (sessionCounter == userSessionsQuantity) {
    if (timeLongBreak === 1000) {
      playAlarm();
      clearInterval(interval);
      startBtn.classList.remove('disabled');
      timeSession = parseInt(minSessionInput.value) * 60000;
      timeBreak = parseInt(minBreakInput.value) * 60000;
      sessionCounter = 1;
    }
    console.log('lb');
    countdownLongBreak();
  }
}

function countdownSession() {
  let minutes = Math.floor(timeSession / 60000);
  let seconds = ((timeSession % 60000) * 1000) / 1000000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  timeSession -= 1000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);
  
  showNextTimer('session');
}

function countdownBreak() {
  let minutes = Math.floor(timeBreak / 60000);
  let seconds = ((timeBreak % 60000) * 1000) / 1000000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  timeBreak -= 1000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  showNextTimer('break');
}

function countdownLongBreak() {
  let minutes = Math.floor(timeLongBreak / 60000);
  let seconds = ((timeLongBreak % 60000) * 1000) / 1000000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  timeLongBreak -= 1000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  showNextTimer('longBreak');
}

function playAlarm() {
  if (audioAuthorization.checked) {
    let audio = document.createElement('audio');
    audio.src = './assets/alarm.wav';
    audio.volume = 0.7;
    audio.play();
  }
}

function format(number) {
  return (number < 10 ? '0' : '') + number;
}

function showNextTimer(key) {
  switch (key) {
    case 'session':
      if (timeSession === 0 && sessionCounter < userSessionsQuantity) {
        minText.innerText = minBreakInput.value;
        secText.innerText = '00';
      } else if (timeSession === 0 && sessionCounter == userSessionsQuantity) {
        minText.innerText = minLongBreakInput.value;
        secText.innerText = '00';
      }
      break;
    case 'break':
      if (timeBreak === 0) {
        minText.innerText = minSessionInput.value;
        secText.innerText = '00';
      }
      break;
    case 'longBreak':
      if (timeLongBreak === 0) {
        minText.innerText = minSessionInput.value;
        secText.innerText = '00';
      }
      break;
  }
}

/* =========== EventListeners ================ */

sessionBtn.addEventListener('click', () => {
  sessionModal.classList.add('d-block');
  closeModalBtn[0].addEventListener('click', () => {
    sessionModal.classList.remove('d-block');
  });
  userSaveInputBtn[0].addEventListener('click', () => {
    timeSession = parseInt(minSessionInput.value) * 60000;
    minText.innerText = minSessionInput.value;
  });
});

breakBtn.addEventListener('click', () => {
  breakModal.classList.add('d-block');
  closeModalBtn[1].addEventListener('click', () => {
    breakModal.classList.remove('d-block');
  });
  userSaveInputBtn[1].addEventListener('click', () => {
    timeBreak = parseInt(minBreakInput.value) * 60000;
  });
});

longBreakBtn.addEventListener('click', () => {
  longBreakModal.classList.add('d-block');
  closeModalBtn[2].addEventListener('click', () => {
    longBreakModal.classList.remove('d-block');
  });
  userSaveInputBtn[2].addEventListener('click', () => {
    timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
  });
});

quantitySessionsBtn.addEventListener('click', () => {
  quantitySessionsModal.classList.add('d-block');
  closeModalBtn[3].addEventListener('click', () => {
    quantitySessionsModal.classList.remove('d-block');
  });
  userSaveInputBtn[3].addEventListener('click', () => {
    userSessionsQuantity = quantitySessionsInput.value;
  });
});

startBtn.addEventListener('click', () => {
  timerControl();
  interval = setInterval(timerControl, 100);
  startBtn.classList.add('disabled');
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
  startBtn.classList.remove('disabled');
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  startBtn.classList.remove('disabled');
  timeSession = parseInt(minSessionInput.value) * 60000;
  timeBreak = parseInt(minBreakInput.value) * 60000;
  timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
  sessionCounter = 1;

  minText.innerText = minSessionInput.value;
  secText.innerText = '00';
});
