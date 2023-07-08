let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  draws: 0,
  loss: 0,
};

let isAutoPlaying = false;
document.querySelector(
  ".js-score"
).innerHTML = `Wins: ${score.wins}, Loss: ${score.loss}, Draws: ${score.draws}`;

let intervalId = "";
//Auto play
function autoPlay() {
  if (!isAutoPlaying) {
    isAutoPlaying = true;
    intervalId = setInterval(function () {
      const playerMove = pickcomputerMove();
      playGame(playerMove);
    }, 1000);

    document.querySelector(".autoPlay").innerHTML = "Stop PLay";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".autoPlay").innerHTML = "Auto PLay";
  }
}

// Score reset
function resetScore() {
  score.wins = 0;
  score.draws = 0;
  score.loss = 0;
  localStorage.removeItem("score");

  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Loss: ${score.loss}, Draws: ${score.draws}`;

  document.querySelector(".result").innerHTML = "";

  document.querySelector(".move").innerHTML = "";
}

// Result processing
function playGame(playerMove) {
  const computerMove = pickcomputerMove();
  if (playerMove === "scissor") {
    if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissor") {
      result = "Its Draw.";
    } else if (computerMove === "rock") {
      result = "You lose.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Its Draw.";
    } else if (computerMove === "scissor") {
      result = "You lose.";
    } else if (computerMove === "rock") {
      result = "You win.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissor") {
      result = "You win.";
    } else if (computerMove === "rock") {
      result = "Its Draw.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.loss += 1;
  } else if (result === "Its Tie.") {
    score.draws += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".result").innerHTML = result;

  document.querySelector(
    ".move"
  ).innerHTML = `  You <img src="img/${playerMove}-emoji.png" alt="" class="move-icon" />
                        <img src="img/${computerMove}-emoji.png" alt="" class="move-icon" />Computer`;

  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Loss: ${score.loss}, Draws: ${score.draws}`;
}

// Computer picking move
function pickcomputerMove() {
  const randomNumber = Math.random();
  let computerMove = " ";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissor";
  }

  return computerMove;
}
