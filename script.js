const LS_KEY = "pips_username";
const FEED_ID = "feed";



// Funktion til at tilføje en pip i feedet
function addPip(username, text) {
  const feed = document.getElementById(FEED_ID);
  const pipDiv = document.createElement("div");
  pipDiv.classList.add("pip");
  pipDiv.innerHTML = `<strong>${username}:</strong> ${text}`;
  feed.prepend(pipDiv); // nyeste øverst
}

// Håndter formularen til pips
document.getElementById("pipForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = localStorage.getItem(LS_KEY);
  const input = document.getElementById("pipInput");
  const text = input.value.trim();



  addPip(username, text);
  input.value = ""; // ryd feltet
});

// Første load → tjek om bruger allerede har navn
const existing = localStorage.getItem(LS_KEY);
renderBar(existing);
