document.getElementById("pipForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("usernameInput").value.trim();
  const pipText = document.getElementById("pipInput").value.trim();

  if (!name || !pipText) {
    alert("Udfyld både navn og pip.");
    return;
  }

  // Klon template
  const pipFrag = document.getElementById("piptemplate").content.cloneNode(true);

  const seed = Math.random().toString(36).substring(2, 10); 
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${name}`;
  pipFrag.querySelector(".avatar").src = avatarUrl;

  // Sæt @ foran brugernavn + brug nye klassenavne
  pipFrag.querySelector(".username").textContent = `@${name}`;
  pipFrag.querySelector(".message").textContent = pipText;

  // Tilføj til feed
  document.getElementById("feed").appendChild(pipFrag);

  // Ryd felter
  document.getElementById("pipInput").value = "";
});
