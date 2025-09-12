// Lyt efter når formen bliver "submittet"
document.getElementById("pipForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Forhindrer at siden genindlæses

  // Hent værdier fra inputfelterne (brugernavn og pip)
  const name = document.getElementById("usernameInput").value.trim();
  const pipText = document.getElementById("pipInput").value.trim();

  // Tjek om begge felter er udfyldt

  // Tjek om begge felter er udfyldt
  if (!name || !pipText) {
    alert("Udfyld både navn og pip."); // Vis besked hvis noget mangler
    return; // Stop funktionen
  }

  // Klon template fra HTML så vi kan lave et nyt pip
  const pipFrag = document.getElementById("piptemplate").content.cloneNode(true);

  const pipElement = pipFrag.querySelector(".pip-container");

  // Lav et avatar-billede baseret på brugernavn (fra Dicebear API)
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${name}`;
  pipFrag.querySelector(".avatar").src = avatarUrl;

  // Sæt @ foran brugernavn og tilføj tekst til pip
  pipFrag.querySelector(".username").textContent = `@${name}`;
  pipFrag.querySelector(".message").textContent = pipText;

   // Find slet-knappen og tilføj event listener
   pipElement.querySelector(".slette_knap").addEventListener("click", () => {
    pipElement.remove(); // fjerner pip fra DOM
  });

  // Tilføj det færdige pip til feedet
  document.getElementById("piplist").prepend(pipFrag);

  // Ryd tekstfeltet efter pip er sendt
  document.getElementById("pipInput").value = "";
});

// Tegntæller til pipInput
const textarea = document.getElementById("pipInput");
const counter = document.getElementById("taeller");
const maxLength = 255;

textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  counter.textContent = `${length} / ${maxLength}`;

  counter.classList.remove("warning", "danger");
  textarea.classList.remove("warning", "danger");

  // Advarer når brugeren nærmer sig grænsen
  if (length > 220 && length < maxLength) {
    counter.classList.add("warning");
    textarea.classList.add("warning");
  } else if (length === maxLength) {
    counter.classList.add("danger");
    textarea.classList.add("danger");
  }
});

