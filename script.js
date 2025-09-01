document.getElementById("pipForm").addEventListener("submit", (event) => {
event.preventDefault()

const name = document.getElementById("usernameInput").value
const pipInput = document.getElementById("pipInput").value

if (name !== "" && pipInput !=="") {
  
let  piptemplate = document.getElementById("piptemplate").content.cloneNode(true)  
piptemplate.querySelector(".pip").innerText = document.getElementById("pipInput").value
piptemplate.querySelector(".username").innerText = document.getElementById("usernameInput").value



document.getElementById("feed").appendChild(piptemplate);
console.log(piptemplate)

} else {
  alert("udfyld navn")
}



})