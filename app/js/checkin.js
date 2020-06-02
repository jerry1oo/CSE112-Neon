var  dialog  = require('electron').remote;
const checkin_functions = require('./checkin_functions.js');
const {checkTeams, checkPrevTask, startFlow, addTask} = checkin_functions;

checkPrevTask();

var startFlowButton = document.getElementById("startFlowBtn")
startFlowButton.addEventListener("click", () => startFlow())

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
var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var uid = localStorage.getItem('userid')
var teamName = ""
var task1 = document.getElementById("Task1")
var task2 = document.getElementById("Task2")
var task3 = document.getElementById("Task3")
task1.value = ""
task2.value = ""
task3.value = ""
var prevList = document.getElementById("prevTask")
var todayTask = document.getElementById("todayTask")

prevList.addEventListener("click", function(event){
    let target = event.target;
    console.log("event",target.parentNode.id)
    text = target.parentNode.firstElementChild.value;
    console.log("text",text)
    parentLi = target.parentNode
  
    if(target.innerText=="Add"){
        if(task1.value ==""){
            task1.value = text
            task1.parentNode.style.display="block" 
            prevList.removeChild(parentLi)
        }
        else if(task2.value==""){
            task2.value = text
            task2.parentNode.style.display="block"
            prevList.removeChild(parentLi)
        }
        else if(task3.value==""){
            task3.value=text
            task3.parentNode.style.display="block" 
            prevList.removeChild(parentLi)
        }
        else{
            dialog.showMessageBox({
                type: 'error',
                title: 'Error',
                message: errorMessage
            }); 
        }
    }
    else if(target.innerText=="Delete"){
        document.getElementById("prevTask").removeChild(parentLi)
    }
});

document.getElementById("addTasks").addEventListener('click',function(){
    console.log(task1.value)
    if(task1.value==""){
        task1.parentNode.style.display="block"
    }
    else if(task2.value==""){
        task2.parentNode.style.display="block"
    }
    else if(task3.value==""){
        task3.parentNode.style.display="block"
    }
    else{
        console.log("here")
    }
});

todayTask.addEventListener('click',function(event){
    target = event.target
    console.log(target.innerText)
    if(target.innerText=="Delete"){
        targetParent = target.parentNode
        targetParent.style.display="none"
        targetParent.firstElementChild.value=""
    }
});