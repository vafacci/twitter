document.getElementById("pipForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("usernameInput").value.trim();
  const pipText = document.getElementById("pipInput").value.trim();

  if (!name || !pipText) {
    alert("Udfyld både navn og pip.");
    return;
  }

  // Klon template
  const pipFrag = document .getElementById("piptemplate").content.cloneNode(true);

  const pipElement = pipFrag.querySelector(".pip-container");

  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${name}`;
  pipFrag.querySelector(".avatar").src = avatarUrl;

  // Sæt @ foran brugernavn + brug nye klassenavne
  pipFrag.querySelector(".username").textContent = `@${name}`;
  pipFrag.querySelector(".message").textContent = pipText;

  // Find slet-knappen og tilføj event listener
  pipElement.querySelector(".slette_knap").addEventListener("click", () => {
    pipElement.remove(); // fjerner pip fra DOM
  });

  // Tilføj til feed
  document.getElementById("piplist").prepend(pipFrag);

  // Ryd felter
  document.getElementById("pipInput").value = "";
});

const textarea = document.getElementById("pipInput");
const counter = document.getElementById("taeller");
const maxLength = 255;

textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  counter.textContent = `${length} / ${maxLength}`;

  counter.classList.remove("warning", "danger");
  textarea.classList.remove("warning", "danger");

  if (length > 220 && length < maxLength) {
    counter.classList.add("warning");
    textarea.classList.add("warning");
  } else if (length === maxLength) {
    counter.classList.add("danger");
    textarea.classList.add("danger");
  }
});
