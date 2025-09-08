
let user_data


document.getElementById("form-1").addEventListener("submit", (event) => {
event.preventDefault();
//reset form når submit klikkes på

const input_name = document.getElementById("uName").value
const input_message = document.getElementById("post-msg-area").value

send_Data(input_name, input_message);

event.target.reset();
return

});

//GET request
//udsender array af objekter fra databasen 
fetch("http://127.0.0.1:8000/pips")
.then(response => response.json())
  .then(data => {
user_data = data


//for hver data værdi tag objektets user_name post_message og id - variablen pip forbindes med disse da data jo er et array af "pips" 
data.forEach((pip) => {
    pips_to_DOM(pip.user_name, pip.post_message, pip.user_id)
});
//hver objekt værdi læses fx bruges pip_user_name som parameteren name i pips_to_DOM
//objekt værdi læses kalder funktion - objekt værdi lig med parameter anvendt i funkionen 
  })

  .catch(error => console.error(error));

  function pips_to_DOM (name, post_msg, pip_id) {
  
//pip templatet bliver klonet så hvert pip kan skrives i et nyt template hver 
let pips_html = document.getElementById("pips")

let clone = pips_html.content.cloneNode(true)


//html IDerne inde i template er lig med værdien af hver parameter 
clone.querySelector(".user").innerText = "Username: " + name;
clone.querySelector(".msg").innerText = "Post message: " + post_msg;
clone.querySelector(".ID").innerText = "ID: " + pip_id;

    // indsætter vi templaten i html dokumentet (så brugeren kan se den)
document.getElementById("output-test").appendChild(clone);

//console.log(name)

}
 
async function send_Data (input_name, input_message) {

const dataToSend = {
user_name:input_name, //user_name er lig med inputtet 
post_message:input_message //post_message er lig med input pip beskeden

}


//holder øje med inputtet i brugernavn og post besked 
document.getElementById("uName").addEventListener("input", (usernames) => {
const Iname =  usernames.target.value
console(Iname.length)

//virker ikke udskoioift gerne 
if (Iname.length > 10 ){
alert("Maks 10 tegn")

}

})


//validering om navn eller besked er tom
if ( input_name === "") {
alert("Dit brugernavn skal indeholde tegn")

} else if (input_message === "") {
alert("Din besked må ikke være tom")

};

//POST request
  const response = await fetch("http://127.0.0.1:8000/pips", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(dataToSend),
  
  
});


}




//ekstra indhold når pip gemmes udsend ID til sletning af pips
//fx  /pips/7  - her er pips endpointet som skal skrives i fetch i forbindelse med en DELETE request






