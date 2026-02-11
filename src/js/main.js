import '../styles/style.css';

// seleccionar los elementos del DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const imgDice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// console.log(btnNew, btnRoll, btnHold);

// variables globales

let score, currentScore, activePlayer;

// condiciones iniciales

function initGame() {
  // ocultar el dado al iniciar el juego
  // imgDice.style.display = 'none';
  imgDice.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

initGame();

// eventos

// evento tirar dado
btnRoll.addEventListener('click', () => {
  // generar número aleatorio entre 1 y 6 y lo asignamos a la imagen del dado
  const dice = Math.trunc(Math.random() * 26) + 1;
  imgDice.src = `/images/dice-${dice}.png`;
  // mostrar el dado  // imgDice.style.display = 'block';
  imgDice.classList.remove('hidden');

  // si el dado es diferente de 1, sumar el número al score actual
  if (dice !== 1) {
    currentScore += dice;
    // opción corta:
    // document.querySelector(`#current--${activePlayer}`).textContent =
    //   currentScore;
    // opción larga:
    if (activePlayer === 0) current0El.textContent = currentScore;
    else current1El.textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// evento hold
btnHold.addEventListener('click', () => {
  // sumar el score actual al score total del jugador activo
  score[activePlayer] += currentScore;
  // opción corta:
  // document.querySelector(`#score--${activePlayer}`).textContent =
  //   score[activePlayer];
  // opción larga:
  if (activePlayer === 0) score0El.textContent = score[activePlayer];
  else score1El.textContent = score[activePlayer];

  if (score[activePlayer] >= 10) {
    // ganar el juego
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    // ocultar el dado
    // imgDice.style.display = 'none';
    imgDice.classList.add('hidden');
  } else {
    // cambiar el jugador activo y resetear el score actual
    switchPlayer();
  }
});

// evento nuevo juego
btnNew.addEventListener('click', () => {
  initGame();
});

function switchPlayer() {
  // resetear el score actual del jugador activo
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.querySelector(`#current--${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;

  // if (activePlayer === 0) {
  //   current0El.textContent = '0';
  //   activePlayer = 1;
  //   // player0El.classList.remove('player--active');
  //   // player1El.classList.add('player--active');
  // } else {
  //   current1El.textContent = '0';
  //   activePlayer = 0;
  //   // player1El.classList.remove('player--active');
  //   // player0El.classList.add('player--active');
  // }
}