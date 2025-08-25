const LS_KEY = "pips_username";
const FEED_ID = "feed";

// Funktion til at vise input eller navn
function renderBar(username) {
  const bar = document.getElementById("userBar");

  if (!username) {
    bar.innerHTML = `
      <form id="setUserForm">
        <label for="username">Vælg brugernavn:</label>
        <input id="username" name="username" placeholder="Skriv dit navn..." autocomplete="off">
        <button type="submit">Gem</button>
      </form>
    `;

    document.getElementById("setUserForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("username").value.trim();

      if (input.length < 3) {
        alert("Brugernavnet skal være mindst 3 tegn.");
        return;
      }

      localStorage.setItem(LS_KEY, input);
      renderBar(input);
    });

  } else {
    bar.innerHTML = `
      <strong>@${username}</strong>
      <button id="changeBtn">Skift</button>
    `;

    document.getElementById("changeBtn").addEventListener("click", () => {
      localStorage.removeItem(LS_KEY);
      renderBar(null);
    });
  }
}

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

  if (!username) {
    alert("Vælg et brugernavn først!");
    return;
  }
  if (text.length === 0) {
    alert("Din pip må ikke være tom.");
    return;
  }

  addPip(username, text);
  input.value = ""; // ryd feltet
});

// Første load → tjek om bruger allerede har navn
const existing = localStorage.getItem(LS_KEY);
renderBar(existing);
