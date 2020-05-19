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
                updateGoal()
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

function updateGoal() {
	var goalText = document.getElementById("goalText")
	var docRef = db.collection("teams").doc(teamName).collection(uid).doc("status")
	docRef.get()
		.then(function(doc) {
            if (doc.exists) {
            	goalText.innerHTML = "Goal: " + doc.data().goal
            } else {
            	console.error("Error getting data");
            }
        })
        .catch(function(error) {
        	dialog.showMessageBox({
	            type: 'error',
	            title: 'Error',
	            message: error.message
	        });
            console.error("Error getting data: ", error);
            document.location.href = 'taskbar.html'
        });
}

var endFlowButton = document.getElementById("endFlowBtn")
endFlowButton.addEventListener("click", () => endFlow())

function endFlow() {
    var docRef = db.collection("teams").doc(teamName).collection(uid).doc("status")
    var currStatus = 0
    if (dict["keepBtn"] == 0) {
    	currStatus = 1
    } else if (dict["sosBtn"] == 0) {
    	currStatus = 2
    } else if (dict["blockedBtn"] == 0) {
    	currStatus = 3
    }
    docRef.update({
    	checkedIn: false,
    	taskStatus: currStatus
    })
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