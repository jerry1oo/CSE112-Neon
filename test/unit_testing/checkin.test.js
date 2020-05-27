
//const {dialog}  = require('electron').remote;
//const checkin = require("../../app/js/checkin.js");
//import {startFlow, checkTeams,dialog} from '../../app/js/checkin.js';
/*
var firebase = require('firebase');
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
var uid = 'odkSxashOmg9QeyRL2cRs00Jke12';
//localStorage.setItem('userid', 'odkSxashOmg9QeyRL2cRs00Jke12');
var teamName = "neon";
/*
function startFlow() {
    console.log("tv1",task1.value)
    var obj = {
    	checkedIn: true,
        task1: task1.value,
        task2: task2.value,
        task3: task3.value,
    	taskStatus: 1
    }
    db.collection("teams").doc(teamName).collection(uid).doc("status").set(obj)
        .then(function() {
            console.log("Document written");
            document.location.href = 'taskbar.html'
        })
        .catch(function(error) {
        	dialog.showMessageBox({
	            type: 'error',
	            title: 'Error',
	            message: error.message
	        });
            console.error("Error adding document: ", error);
            document.location.href = 'taskbar.html'
        });
}
*/
function addTask(parent,text){
    let task = `
        <li>
            <input style="display: inline-block;" value = "${text}">
            <button class="bt">Add</button>
            <button class="bt">Delete</button>
        </li>`
    parent.insertAdjacentHTML('beforeend', task);
}
const jsdom = require('jsdom')
const {JSDOM} = jsdom;
//const dom = new JSDOM('<!DOCTYPE html>');
//var div = dom.window.document.createElement('div'); 
var html = '`<input type="text" id="Task1" value="">' +
           '<input type="text" id="Task2" value="">'+
           '<input type="text" id="Task3" value="">';
//div.innerHTML = html;
const dom = new JSDOM(html);
dom.window.document.getElementById("Task1").value = "This Test Better Work!";
console.log(dom.window.document.getElementById("Task1").value);
