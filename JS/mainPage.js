// the indicators to the nav buttons in the top of the page
const myLeagueLink = document.querySelector("#navMyLeague");
const myBetsLink = document.querySelector("#navMyBets");
const friendsBetsLink = document.querySelector("#navFriendsBets");
const rulesLink = document.querySelector("#navRules");

// the indicators to the different pages in the main page
const myLeagueDiv = document.querySelector("#myLeagueDiv");
const myBetsDiv = document.querySelector("#myBetsDiv");
const friendsBetsDiv = document.querySelector("#friendsBetsDiv");
const rulesDiv = document.querySelector("#rulesDiv");

let currentActiveNav = myLeagueLink;
let currentActiveDisplay = myLeagueDiv;

//function that gets the nav button that clicked and reload the page to the correct page
const changeDisplay = (navlink, displayDiv) => {
  currentActiveNav.classList.remove("active");
  currentActiveDisplay.classList.add("d-none");
  navlink.classList.add("active");
  displayDiv.classList.remove("d-none");
  currentActiveNav = navlink;
  currentActiveDisplay = displayDiv;
};

//for each nav button calling the function that will diaplay the correct page
myLeagueLink.addEventListener("click", () => {
  changeDisplay(myLeagueLink, myLeagueDiv);
});

myBetsLink.addEventListener("click", () => {
  changeDisplay(myBetsLink, myBetsDiv);
});

friendsBetsLink.addEventListener("click", () => {
  changeDisplay(friendsBetsLink, friendsBetsDiv);
});

rulesLink.addEventListener("click", () => {
  changeDisplay(rulesLink, rulesDiv);
});
