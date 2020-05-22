
//const {dialog}  = require('electron').remote;
const checkin = require("../../app/js/checkin.js");
//import {startFlow, checkTeams,dialog} from '../../app/js/checkin.js';
var firebaseConfig = {
    apiKey: "AIzaSyBmn_tDSlm4lLdrvSqj8Yb00KkYae8cL-Y",
    authDomain: "neon-pulse-development.firebaseapp.com",
    databaseURL: "https://neon-pulse-development.firebaseio.com",
    projectId: "neon-pulse-development",
    storageBucket: "neon-pulse-development.appspot.com",
    messagingSenderId: "240091062123",
    appId: "1:240091062123:web:babe11f5f03ced38fbb62e",
    measurementId: "G-VMS6JL8H4S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
localStorage.setItem('userid', 'odkSxashOmg9QeyRL2cRs00Jke12');
var uid = localStorage.getItem('userid');
var teamName = "neon";
var div = document.createElement('div'); 
var html = '<textarea rows="4" cols="80" placeholder="Your Goal Here" id="goalText"></textarea>';
div.innerHTML = html;
document.getElementById("goalText").value = "This Test Better Work!";
console.log(document.getElementById("goalText").value);
