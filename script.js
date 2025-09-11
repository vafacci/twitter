// Lyt efter når formen bliver "submittet"
document.getElementById("pipForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Forhindrer at siden genindlæses

  // Hent værdier fra inputfelterne (brugernavn og pip)
  const name = document.getElementById("usernameInput").value.trim();
  const pipText = document.getElementById("pipInput").value.trim();

  // Tjek om begge felter er udfyldt
  if (!name || !pipText) {
    alert("Udfyld både navn og pip."); // Vis besked hvis noget mangler
    return; // Stop funktionen
  }

  // Klon template fra HTML så vi kan lave et nyt pip
  const pipFrag = document.getElementById("piptemplate").content.cloneNode(true);

  // Lav et avatar-billede baseret på brugernavn (fra Dicebear API)
  const seed = Math.random().toString(36).substring(2, 10); 
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${name}`;
  pipFrag.querySelector(".avatar").src = avatarUrl;

  // Sæt @ foran brugernavn og tilføj tekst til pip
  pipFrag.querySelector(".username").textContent = `@${name}`;
  pipFrag.querySelector(".message").textContent = pipText;

  // Tilføj det færdige pip til feedet
  document.getElementById("feed").appendChild(pipFrag);

  // Ryd tekstfeltet efter pip er sendt
  document.getElementById("pipInput").value = "";
});

// Tegntæller til pipInput
document.getElementById("pipInput").addEventListener("input", () => {
  const pipInput = document.getElementById("pipInput"); // tekstfelt
  const taeller = document.getElementById("taeller");   // tæller-span
  const currentLength = pipInput.value.length;          // hvor mange tegn nu

  taeller.textContent = `${currentLength} / 255`; // opdater tælleren

  // Tjek om man har nået 255 tegn
  if (currentLength === 255) {
    alert("Du har nået maks antal tegn (255)!");
  }
});

