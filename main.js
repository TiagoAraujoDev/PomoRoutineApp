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

/* ========= TIMER ================*/

let timeSession = parseInt(minSessionInput.value) * 60000;
let timeBreak = parseInt(minBreakInput.value) * 60000;
let timeLongBreak = parseInt(minLongBreakInput.value) * 60000;

const minText = document.getElementById('minText');
const secText = document.getElementById('secText');

minText.innerText = minSessionInput.value;

let breakCounter = 0;
function countdownTimer() {
  if (breakCounter <= 4) {
    if (timeSession != 0) {
      let minutes = Math.floor(timeSession / 60000);
      let seconds = ((timeSession % 60000) * 1000) / 1000000;

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeSession -= 1000;
    } else if (timeSession == 0) {
      let minutes = Math.floor(timeBreak / 60000);
      let seconds = ((timeBreak % 60000) * 1000) / 1000000;
      const minText = document.getElementById('minText');
      const secText = document.getElementById('secText');

      minText.innerText = format(minutes);
      secText.innerText = format(seconds);

      timeBreak -= 1000;
      /* FIX THIS */
      breakCounter++;
    }
  } else {
    let minutes = Math.floor(timeLongBreak / 60000);
    let seconds = ((timeLongBreak % 60000) * 1000) / 1000000;
    const minText = document.getElementById('minText');
    const secText = document.getElementById('secText');

    minText.innerText = format(minutes);
    secText.innerText = format(seconds);

    timeLongBreak -= 1000;
    /* BUG */
    breakCounter = 0;
    timeSession = minSessionInput.value;
    timeBreak = minBreakInput.value;
  }
}

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
  countdownTimer();
  setInterval(countdownTimer, 1000);
});
