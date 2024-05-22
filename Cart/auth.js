const inputEmail = document.getElementById("email");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const inputConfPasword = document.getElementById("confpassword");
const inputRegisterBtn = document.querySelector("#register");

const baseURL = "http://localhost:3000/users/";

inputRegisterBtn.addEventListener("click", getUser);

//  addUSer
async function getUser(e) {
  e.preventDefault();
  let email = inputEmail.value;
  console.log(email);
  let username = inputUsername.value;
  console.log(username);
  let password = inputPassword.value;
  console.log(password);
  let confPasword = inputConfPasword.value;
  console.log(confPasword);

  email = email.trim().toLowerCase();
  username = username.trim().toLowerCase();
  password = password.trim().toLowerCase();
  confPasword = confPasword.trim().toLowerCase();
  let validation = validate(email, username, password, confPasword);

  if (!validation) {
    console.log("please recheck on your credenctials");
  } else {
    console.log("good creds credenctials");

    //get users
    let users = await getDbUsers();
    // checjk username
    let existingUser = users.find((user) => user.username === username);
    console.log(existingUser);
    if (existingUser) {
      console.log("Username name is taken please use another username");
    } else {
      let user = {
        email: email,
        username: username,
        password: password,
      };

      registerUser(user);
    }
  }
}

function validate(email, username, password, confPasword) {
  console.log(email, username, password, confPasword);
  // if its empty
  if (
    email.trim() == "" ||
    username.trim() == "" ||
    password.trim() == "" ||
    confPasword.trim() == ""
  ) {
    console.log("The field must not be empty");
    return false;
  } else if (password !== confPasword) {
    console.log("Password must match");
    return false;
  }

  return true;
}

//get all users
async function getDbUsers() {
  let responce = await fetch(baseURL);
  let users = await responce.json();
  //  console.log(typeof(users))
  return users;
}

// registerUser
function registerUser(user) {
  let response = fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(user),
  });

  console.log(response.json());
}
