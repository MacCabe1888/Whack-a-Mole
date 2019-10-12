const scoreboard = document.querySelector(".score");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole == lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function randomTime(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function peep() {
  const hole = randomHole(holes);
  hole.classList.add("up");
  const time = randomTime(200, 1000);
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function whack(e) {
  if (!e.isTrusted) return;
  this.classList.remove("up");
  score++;
  scoreboard.textContent = score;
}

function startGame() {
  scoreboard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

moles.forEach(mole => mole.addEventListener("click", whack));
