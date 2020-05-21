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
        .then(function (querySnapshot) {
            console.log(querySnapshot.docs)
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach(function (doc) {
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
        .catch(function (error) {
            dialog.showMessageBox({
                type: 'error',
                title: 'Error',
                message: errorMessage
            });
            console.log("Error getting documents: ", error);
            document.location.href = 'taskbar.html'
        });
}

var form = document.getElementById("form");
//create a list of goals that user saved in check-in
function createGoalList(goal, n) {
    var checkbox = document.createElement('input');

    // Assigning the attributes 
    // to created checkbox 
    checkbox.type = "checkbox";
    var id = "task" + n.toString;
    checkbox.id = id;
    n++;

    // creating label for checkbox 
    var label = document.createElement('label');

    // assigning attributes for  
    // the created label tag  
    label.htmlFor = id;

    // appending the created text to  
    // the created label tag  
    var s = "";
    label.appendChild(document.createTextNode(goal + s));

    // appending the checkbox 
    // and label to div 
    form.appendChild(checkbox);
    form.appendChild(label);
    form.appendChild(document.createElement('br'));
}
//check to see if the goal is completed or not
function checkGoal() {
    var n = 1;
    // Get the checkbox
    var checkBox = document.getElementById("task"+n.toString);

  
    if (checkBox.checked == true){
    } else {
    }
  }

function updateGoal() {
    var n = 1;
    var goalText = document.getElementById("goalText")
    var docRef = db.collection("teams").doc(teamName).collection(uid).doc("status")
    docRef.get()
        .then(function (doc) {
            if (doc.exists) {
                // goalText.innerHTML = "Goal: " + doc.data().goal
                createGoalList(doc.data().goal, n);
            } else {
                console.error("Error getting data");
            }
        })
        .catch(function (error) {
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
        .then(function () {
            console.log("Document written");
            document.location.href = 'taskbar.html'
        })
        .catch(function (error) {
            dialog.showMessageBox({
                type: 'error',
                title: 'Error',
                message: error.message
            });
            console.error("Error adding document: ", error);
            document.location.href = 'taskbar.html'
        });
}