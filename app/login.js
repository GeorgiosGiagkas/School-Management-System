//Set variables
const loginForm = document.getElementById("login");

//add Event listener
loginForm.addEventListener("submit", checkLoginCredentials);


function checkLoginCredentials(e) {
    e.preventDefault();
    let userName = document.getElementById("username");
    let password = document.getElementById("password");

    

    if (userName.value === "" || password.value === "") {
        displayMessage("Please fill in the form!");
    }

    else if (userName.value === "admin" && password.value === "admin") {
        callLoaderIcon();
        window.setTimeout(logIn,2000)
    } else {
        displayMessage("Incorrect password! Please try again!");

    }

    userName.value = "";
    password.value = "";

}

function displayMessage(message) {
    const body = document.querySelector("body");
    const div = document.createElement("div");

    div.className = "container alert custom-primary custom-border";

    div.appendChild(document.createTextNode(message));

    body.insertBefore(div, loginForm);

    window.setTimeout(
        function () {
            div.remove();
        }, 2000
    )
}

function callLoaderIcon() {
    const loader = document.getElementById("loader");
    loader.className = "spinner-border mx-auto mb-3";
}

function logIn(){
    window.location.href = "courses.html";
}