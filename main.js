const sessionBtn = document.getElementById('sessionSetting');
const breakBtn = document.getElementById('breakSetting');
const longBreakBtn = document.getElementById('longBreakSetting');
const sessionModal = document.getElementById('sessionModal');
const breakModal = document.getElementById('breakModal');
const longBreakModal = document.getElementById('longBreakModal');
const closeModalBtn = document.querySelectorAll('#closeModalbtn');
const minSessionInput = document.getElementById('minSession');
const minBreakInput = document.getElementById('minBreak');
const minLongBreakInput = document.getElementById('minLongBreak');
const userSaveInputBtn = document.querySelectorAll('.saveTimeBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minText = document.getElementById('minText');
const secText = document.getElementById('secText');

/* ========= TIMER ================*/

let timeSession = parseInt(minSessionInput.value) * 60000;
let timeBreak = parseInt(minBreakInput.value) * 60000;
let timeLongBreak = parseInt(minLongBreakInput.value) * 60000;

minText.innerText = minSessionInput.value;

let sessionCounter = 1;
const userSessionsQuantity = 3;

let interval;

// const sound = new Audio('sound.mp3');

function timerControl() {
  if (timeSession !== 0) {
    if (timeSession === 1000 && sessionCounter < userSessionsQuantity) {
      timeBreak = parseFloat(minBreakInput.value) * 60000;
      sessionCounter++;
    }
    timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
    countdownSession();
  } else if (timeSession === 0 && timeBreak !== 0) {
    if (timeBreak === 1000) {
      timeSession = parseInt(minSessionInput.value) * 60000;
    }
    countdownBreak();
  } else if (sessionCounter === userSessionsQuantity) {
    if (timeLongBreak === 1000) {
      timeSession = parseInt(minSessionInput.value) * 60000;
      timeBreak = parseInt(minBreakInput.value) * 60000;
      sessionCounter = 1;
    }
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
}
function countdownBreak() {
  let minutes = Math.floor(timeBreak / 60000);
  let seconds = ((timeBreak % 60000) * 1000) / 1000000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  timeBreak -= 1000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);
}
function countdownLongBreak() {
  let minutes = Math.floor(timeLongBreak / 60000);
  let seconds = ((timeLongBreak % 60000) * 1000) / 1000000;
  
  minText.innerText = format(minutes);
  secText.innerText = format(seconds);

  timeLongBreak -= 1000;

  minText.innerText = format(minutes);
  secText.innerText = format(seconds);
}

/* function countdownTimer() {
  switch (sessionControl()) {
    case 'session':
      minutes = Math.floor(timeSession / 60000);
      seconds = ((timeSession % 60000) * 1000) / 1000000;

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeSession -= 1000;
      break;
    case 'break':
      minutes = Math.floor(timeBreak / 60000);
      seconds = ((timeBreak % 60000) * 1000) / 1000000;

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeBreak -= 1000;
      break;
    case 'longBreak':
      minutes = Math.floor(timeLongBreak / 60000);
      seconds = ((timeLongBreak % 60000) * 1000) / 1000000;

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeLongBreak -= 1000;
      break;
  }
}
 */
/* function countdownTimer() {
  if (breakCounter <= 2) {
    if (timeSession != 0) {
      let minutes = Math.floor(timeSession / 60000);
      let seconds = ((timeSession % 60000) * 1000) / 1000000;

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeSession -= 1000;
    } else if (timeSession == 0) {
      if (timeSession == 0) {
        clearInterval(interval);
      }
      let minutes = Math.floor(timeBreak / 60000);
      let seconds = ((timeBreak % 60000) * 1000) / 1000000;
      const minText = document.getElementById('minText');
      const secText = document.getElementById('secText');

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeBreak -= 1000;
      if (timeBreak == 0) {
        timeBreak = parseInt(minBreakInput.value) * 60000;
        breakCounter++;
      }
    }
  } else {
    let minutes = Math.floor(timeLongBreak / 60000);
    let seconds = ((timeLongBreak % 60000) * 1000) / 1000000;
    const minText = document.getElementById('minText');
    const secText = document.getElementById('secText');

    minText.innerText = format(minutes);
    secText.innerText = format(seconds);

    timeLongBreak -= 1000;
    if (timeLongBreak == 0) {
      breakCounter = 0;
      timeSession = parseInt(minSessionInput.value) * 60000;
      timeBreak = parseInt(minBreakInput.value) * 60000;
      timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
    }
  }
} */

function format(number) {
  return (number < 10 ? '0' : '') + number;
}

/* =========== Interactions Events ================ */

sessionBtn.addEventListener('click', () => {
  sessionModal.classList.add('d-block');
  closeModalBtn[0].addEventListener('click', () => {
    sessionModal.classList.remove('d-block');
  });
  userSaveInputBtn[0].addEventListener('click', () => {
    timeSession = parseInt(minSessionInput.value) * 60000;
    minText.innerText = minSessionInput.value;
    console.log('on');
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

startBtn.addEventListener('click', () => {
  timerControl();
  interval = setInterval(timerControl, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(interval);
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  timeSession = parseInt(minSessionInput.value) * 60000;
  timeBreak = parseInt(minBreakInput.value) * 60000;
  timeLongBreak = parseInt(minLongBreakInput.value) * 60000;
  sessionCounter = 1;

  minText.innerText = minSessionInput.value;
  secText.innerText = '00';
});
