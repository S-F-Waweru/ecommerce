// this is the variable username in the database.
const inputUserName = databaseName;
// this is the variable password in the database.
const inputPass = databasePass;
// this is for password comparison.
const bcrypt = require('bcryptjs');



function logIn(){
    const userName = document.getElementById("userName").value;
    
    if (userName.length === 0) {
        document.getElementById("userName").textContent = "PLEASE TYPE IN YOUR USERNAME";
    } else {
        const capName= userName.toUpperCase();

        if (capName.toUpperCase === inputUserName){
            return "ALRIGHT";
        }else{
            return "OOPS! YOU SURE?"
        }
        bycryt.compare(password,inputPass,(error,isMatch) =>{
            if (err){
                return "mmmmm, suspicious! correct it!";
            } 
            if (isMatch) {
                console.log('Correct password! WELCOME');
            } else {
                console.log('Incorrect password!');
            }
        });
    }
}