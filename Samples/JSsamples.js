import { auth, logOutUser } from "./usersFireBase.js";

//Header JavaScript
//change the deafult user name + get object
const userNameHref = document.querySelector('.userNameHref');
// Get user that already log in
onAuthStateChanged(auth, (user) => {
  userNameHref.textContent = user.displayName;
});

//log out from user
const logOutButton = document.querySelector('.logOutButton');
logOutButton.addEventListener('click', () => {
  logOutUser().then(() => {
    alert("log out");
    window.location = "./index.html";
  })
});