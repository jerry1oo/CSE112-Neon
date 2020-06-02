var sinon = require('sinon')
var fs = require('fs');
const LocalStorageMock = require('./localStorageMock');
const path = require('../../app/js/checkin_functions');
const {startFlow} = path;
var html;


/*
fs.readFile(__dirname+ '/../../app/checkin.html', 'utf8', async function(err,data){
	//console.log('html is: ' + data);
	html = data;
});
console.log(html);
//const firebase = require('firebase');
 /*
 var store = {};

  sinon.spyOn(localStorage, 'getItem').andCallFake(function (key) {
    return store[key];
  });
  sinon.spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
    return store[key] = value + '';
  });
  sinon.spyOn(localStorage, 'clear').andCallFake(function () {
      store = {};
  });*/


global.localStorage = new LocalStorageMock;
global.localStorage.setItem('userid', 'odkSxashOmg9QeyRL2cRs00Jke12');
	/*
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
var teamName = "neon";*/
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

function addTask(parent,text){
    let task = `
        <li>
            <input style="display: inline-block;" value = "${text}">
            <button class="bt">Add</button>
            <button class="bt">Delete</button>
        </li>`
    parent.insertAdjacentHTML('beforeend', task);
}*/
const jsdom = require('jsdom')
const {JSDOM} = jsdom;
//const dom = new JSDOM('<!DOCTYPE html>');
//var div = dom.window.document.createElement('div');
/*
var html = '`<input type="text" id="Task1" value="">' +
           '<input type="text" id="Task2" value="">'+
           '<input type="text" id="Task3" value="">'+
           '<button id="startFlowBtn" style="display: block;">Start My Flow</button>';
global.DOMParser = new JSDOM().window.DOMParser
const parser = new global.DOMParser();*/
//div.innerHTML = html;

fs.readFile(__dirname+ '/../../app/checkin.html', 'utf8', async function(err,data){
	//console.log('html is: ' + data);
	html = data;
	const dom = new JSDOM(html);
	console.log(html);
        global.document = dom.window.document;
	//var checkPrevTask = sinon.stub('checkPrevTask');
	//var checkin = require("../../app/js/checkin.js")
	//checkstub = sinon.stub(checkin, 'checkPrevTask');


});


//const dom = new JSDOM(html);
//dom.window.document.getElementById("Task1").value = "This Test Better Work!";
//let parser = new DOMParser()*/
//global.document = parser.parseFromString('../../app/checkin.html','text/html');

//global.document = dom.window.document;
//const checkin = require("../../app/js/checkin.js");

//dom.window.document.getElementById("Task1").value = "This Test Better Work!";
//console.log(dom.window.document.getElementById("Task1").value);

