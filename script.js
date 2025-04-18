
const totalLetters = "BUNNYSQUAD".split("");
const pages = ["forest", "beach", "garden", "countryside", "meadow"];
const eggsPerPage = 30;
const allEggCount = eggsPerPage * pages.length;
const pageName = window.location.pathname.split("/").pop().replace(".html", "");
const eggIndex = pages.indexOf(pageName) * eggsPerPage;

function shuffleArray(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
}

const assignments = (() => {
  const letters = [...totalLetters];
  const assignments = {};
  for (let page = 0; page < pages.length; page++) {
    const base = page * eggsPerPage;
    const positions = shuffleArray(Array.from({ length: eggsPerPage }, (_, i) => base + i));
    const l1 = letters.shift();
    const l2 = letters.shift();
    if (l1) assignments[positions[0]] = l1;
    if (l2) assignments[positions[1]] = l2;
  }
  return assignments;
})();

let crackedEggs = [];

window.onload = () => {
  const grid = document.getElementById("eggGrid");

  for (let i = 0; i < eggsPerPage; i++) {
    const globalIndex = eggIndex + i;
    const egg = document.createElement("div");
    egg.className = "egg";
    egg.dataset.index = globalIndex;

    egg.onclick = () => {
      if (egg.classList.contains("cracked")) return;
      egg.classList.add("cracked");

      const letter = assignments[globalIndex];
      if (letter) {
        crackedEggs.push(letter);
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = letter;
        egg.appendChild(span);
      }

      updateScrambledLetters();
    };

    grid.appendChild(egg);
  }
};

function updateScrambledLetters() {
  const scramble = document.getElementById("scrambled");
  scramble.innerText = "Scrambled Letters: " + crackedEggs.join(" ");
}
