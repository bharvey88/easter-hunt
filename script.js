
const totalLetters = "YOLKEDUP".split(""); // 8 letters
const allEggCount = 50;
const pageName = window.location.pathname.split("/").pop().replace(".html", "");
const pages = ["forest", "beach", "garden", "countryside", "meadow"];
const eggIndex = pages.indexOf(pageName) * 10;

function generateRandomAssignments() {
  let positions = Array.from({ length: allEggCount }, (_, i) => i);
  positions.sort(() => 0.5 - Math.random());
  const assignments = {};
  for (let i = 0; i < totalLetters.length; i++) {
    assignments[positions[i]] = totalLetters[i];
  }
  return assignments;
}

window.onload = () => {
  const assignments = generateRandomAssignments();
  const grid = document.getElementById("eggGrid");

  for (let i = 0; i < 10; i++) {
    const globalIndex = eggIndex + i;
    const egg = document.createElement("div");
    egg.className = "egg";
    egg.dataset.index = globalIndex;

    const key = `egg_${pageName}_${i}`;
    const saved = localStorage.getItem(key);
    const savedLetter = localStorage.getItem(`${key}_letter`);

    if (saved) {
      egg.classList.add("cracked");
      if (savedLetter) {
        egg.textContent = atob(savedLetter);
      }
    }

    egg.onclick = () => {
      if (egg.classList.contains("cracked")) return;
      egg.classList.add("cracked", "crack-anim");
      const letter = assignments[globalIndex];
      if (letter) {
        egg.textContent = letter;
        localStorage.setItem(`${key}_letter`, btoa(letter));
      }
      localStorage.setItem(key, "cracked");
    };

    grid.appendChild(egg);
  }

  const revealedLetters = [];
  Object.keys(localStorage).forEach(k => {
    if (k.endsWith("_letter")) revealedLetters.push(atob(localStorage.getItem(k)));
  });

  if (revealedLetters.length >= totalLetters.length) {
    document.getElementById("scrambled").innerText =
      "Scrambled Letters: " + revealedLetters.join(" ");
    document.getElementById("guessSection").style.display = "block";
  }
};

function checkCode() {
  const input = document.getElementById("codeInput").value.toUpperCase();
  const result = document.getElementById("result");
  if (input === "YOLKEDUP") {
    result.textContent = "🎉 You got it! Use code YOLKEDUP at checkout for 100% off one item!";
  } else {
    result.textContent = "❌ Oops! That’s not quite right. Try again!";
  }
}
