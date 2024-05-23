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
  usernameT = usernameT.trim()
  passwordT = passwordT.trim()
  if (validation) {
    // show the user details
    console.log(usernameT, passwordT);
    authUser(usernameT, password)
  }
}

async function authUser(usernameT, passwordT) {
  let users = await getUsersdb();
  // validate the user then redirect to product page
  let user = users.find(user => (user.username === usernameT) &&
  (user.password === passwordT))

  if(user) {
    window.location.href = "index.html"
  }else{
    alert("Username or passowrd does not match")
    window.location.href = "register.html"
  }



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
