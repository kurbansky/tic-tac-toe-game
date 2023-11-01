const boxes = document.querySelectorAll(".box");
let startFields = ["", "", "", "", "", "", "", "", ""];
const btn = document.querySelector(".btn");
const message = document.querySelector(".message");

let player = "circle";
let isGameActive = true;

const winningScores = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (
      !isGameActive ||
      box.classList.contains("circle") ||
      box.classList.contains("cross")
    ) {
      return; // The game stops if it is inactive or a box(field) is marked.
    }

    box.classList.add(player);
    startFields[index] = player;

    if (checkWin()) {
      message.textContent = `${player} won!`;
      isGameActive = false;
    } else if (startFields.every((field) => field !== "")) {
      message.textContent = "it's a draw!";
      isGameActive = false;
    }

    player = player === "circle" ? "cross" : "circle";
  });
});

function checkWin() {
  return winningScores.some((combination) => {
    const [a, b, c] = combination.map((index) => startFields[index]);
    return a === b && b === c && a !== "";
  });
}

function restartGame() {
  startFields = ["", "", "", "", "", "", "", "", ""];
  player = "circle";
  isGameActive = true;
  message.textContent = "";
  boxes.forEach((box) => {
    box.classList.remove("circle", "cross");
  });
}

btn.addEventListener("click", restartGame);
