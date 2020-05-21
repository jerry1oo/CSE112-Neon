const { dialog } = require('electron').remote;

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
var uid = localStorage.getItem('userid')
var teamName = ""

checkTeams()

function checkTeams() {
	var errorMessage = "An error occurred when trying to find your team, returning to main page."
    db.collection("teams").where(uid, "==", true)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot.docs)
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach(function(doc) {
                    teamName = doc.id
                });
            } else {
            	dialog.showMessageBox({
		            type: 'error',
		            title: 'Error',
		            message: errorMessage
		        });
                console.log("Team not found")
                document.location.href = 'taskbar.html'
            }
        })
        .catch(function(error) {
        	dialog.showMessageBox({
	            type: 'error',
	            title: 'Error',
	            message: errorMessage
	        });
            console.log("Error getting documents: ", error);
            document.location.href = 'taskbar.html'
        });
}
function checkPrevTask(){
    db.collection("teams").where(uid, "==", true)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot.docs)
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach(function(doc) {
                    teamName = doc.id
                });
            }
            return teamName

        }).then(function(teamName){
        db.collection("teams")
        .doc(teamName)
        .collection(uid).doc("status").get()
        .then(function(status){
           statusObj = status.data()
           ptDiv= document.getElementById("prevTask")
           if(statusObj.task1!="" || statusObj.task2!="" || statusObj.task3!=""){
                ptDiv.style.display="block"
           }
           if(statusObj.task1!=""){
               addTask(ptDiv,statusObj.task1)
           }
           if(statusObj.task2!=""){
               addTask(ptDiv,statusObj.task2)
           }
           if(statusObj.task3!=""){
               addTask(ptDiv,statusObj.task3)
           }
        })
        .catch(function(error){
            console.log("Error checking prev tasks",error)
        });
        });
}
checkPrevTask()

var startFlowButton = document.getElementById("startFlowBtn")
startFlowButton.addEventListener("click", () => startFlow())

//startflow will always send 3 tasks value, if the user didn't not set any of them, just set the val to be ""
function startFlow() {
    var task1 = document.getElementById("Task1")
    var task2 = document.getElementById("Task2")
    var task3 = document.getElementById("Task3")
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
        <div>
            <input style="display: inline-block; ali" value = ${text}>
            <button>Add</button>
            <button>Delete</button>
        </div>
    </li>`
    parent.insertAdjacentHTML('beforeend', task);
}
document.getElementById("prevTask").onclick=function(event){
    let target = event.target;
    parentNode = target.parentNode;
    if(target.innerText=="Add"){
        
    }
}
