const baseURLUSer = "http://localhost:3000/users/";

const loginBtn = document.querySelector(".loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");

//login
loginBtn.addEventListener("click", authenticateLogin);

function authenticateLogin(e) {
  e.preventDefault();

  let usernameT = username.value
  let passwordT = password.value
  let validation = validate(usernameT, passwordT);
  if (validation) {
    // show the user details
    console.log(usernameT, passwordT);
  }
}

async function authUser(usernameT, passwordT) {
  let users = await getUsersdb();
  // validate the user then redirect to product page
  


}

function validate(usernameT, passwordT) {
  if (usernameT.trim() == "" && passwordT.trim() == "") {
    return false;
  } else {
    return true;
  }
}

// json
async function getUsersdb() {
  let response = await fetch(baseURLUSer);
  let users = await response.json();
  return users;
}
