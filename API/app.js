import fetch from "node-fetch";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC_jSUTKeamVerqfTUzk6okNxEMuKwHCfc",
  authDomain: "comprabets.firebaseapp.com",
  projectId: "comprabets",
  storageBucket: "comprabets.appspot.com",
  messagingSenderId: "4808226814",
  appId: "1:4808226814:web:85f7766bf4afad0b7272af",
};
const app = initializeApp(firebaseConfig);

import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();
//collection name
const matchesColRef = collection(db, "matches");

// getting the World Cup 2022 matches
const base = "https://api.football-data.org/v4/competitions/WC/matches";
const getMatchesFromAPI = async () => {
  const response = await fetch(base, {
    headers: {
      "X-Auth-Token": "4a7cd31681e04ac4ae31805f397eae26",
    },
  });
  const data = await response.json();
  return data;
};

const addMatch = async (match) => {
  if (match.homeTeam.crest != null) {
    const fullDate = match.utcDate.split("T");
    //date
    let date = fullDate[0];
    date = fullDate[0].split("-");
    date = date[2] + "/" + date[1] + "/" + date[0];
    //time
    let time = fullDate[1].substring(0, 8);
    time = fullDate[1].split(":");
    time = Number(time[0]) + 2 + ":" + time[1];
    //group name
    if (match.stage == "GROUP_STAGE") {
      const groupName = match.group.split("_");
      match.group = groupName[0] + " " + groupName[1];
    }
    //group stage
    const stage = match.stage.split("_");
    match.stage = stage[0] + " " + stage[1];
    //check the winner
    let winnerTeam = "";
    if (
      match.score.winner == "DRAW" ||
      match.score.duration == "PENALTY_SHOOTOUT"
    ) {
      winnerTeam = "Tie";
    } else if (match.score.winner == "HOME_TEAM") {
      winnerTeam = match.homeTeam.name;
    } else if (match.score.winner == "AWAY_TEAM") {
      winnerTeam = match.awayTeam.name;
    }
    let finalResultGame = "";
    let homeTeamResult, awayTeamResult;
    if (match.score.duration != "REGULAR") {
      homeTeamResult =
        match.score.regularTime.home + match.score.extraTime.home;
      awayTeamResult =
        match.score.regularTime.away + match.score.extraTime.away;
      finalResultGame = homeTeamResult + ":" + awayTeamResult;
    } else {
      finalResultGame =
        match.score.fullTime.home + ":" + match.score.fullTime.away;
    }
    await addDoc(matchesColRef, {
      awayTeam: match.awayTeam.name,
      date: date,
      gameWeek: match.matchday,
      group: match.group,
      homeTeam: match.homeTeam.name,
      iconAwayTeamURL: match.awayTeam.crest,
      iconHomeTeamURL: match.homeTeam.crest,
      stage: match.stage,
      time: time,
      winner: winnerTeam,
      finalScore: finalResultGame,
      api_ID: match.id,
    });
  }
};

const updateMatches = async () => {
  const data = await getMatchesFromAPI();
  data.matches.forEach(async (match) => await addMatch(match));
};

// getMatchesFromAPI().then((data) =>
//   console.log(
//     data.matches[52].score.regularTime.away +
//       data.matches[52].score.extraTime.away +
//       data.matches[52].score.regularTime.home +
//       data.matches[52].score.extraTime.home
//   )
// );

updateMatches()
  .then(() => console.log("Done!"))
  .catch((err) => console.log(err));
