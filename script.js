// script.js

const minNum = 1;
const maxNum = 100;
let secretNum = generateRandomNum(minNum, maxNum);
let attempts = 0;
let highscore = 0;

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const highscoreDisplay = document.getElementById('highscore');
const resetBtn = document.getElementById('reset-btn');

document.getElementById('min-num').textContent = minNum;
document.getElementById('max-num').textContent = maxNum;

guessBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkGuess();
});

resetBtn.addEventListener('click', resetGame);

function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < minNum || guess > maxNum) {
    showMessage(`Please enter a number between ${minNum} and ${maxNum}`, 'error');
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNum) {
    showMessage(`🎉 Correct! The number was ${secretNum}`, 'success');
    updateHighscore(attempts);
    endGame();
  } else if (guess < secretNum) {
    showMessage('⬆️ Too low! Try a higher number.', 'warning');
  } else {
    showMessage('⬇️ Too high! Try a lower number.', 'warning');
  }

  guessInput.value = '';
  guessInput.focus();
}

function showMessage(msg, type) {
    message.textContent = msg;
    message.className = 'message'; // reset classes
  
    if (type === 'success') {
      message.classList.add('success');
    } else if (type === 'warning') {
      message.classList.add('warning');
    } else {
      message.classList.add('error');
    }
  }
  
function updateHighscore(currentAttempts) {
  if (highscore === 0 || currentAttempts < highscore) {
    highscore = currentAttempts;
    highscoreDisplay.textContent = highscore;
  }
}

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  resetBtn.classList.remove('hidden');
}

function resetGame() {
  secretNum = generateRandomNum(minNum, maxNum);
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  message.textContent = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  resetBtn.classList.add('hidden');
  guessInput.value = '';
  guessInput.focus();
}
