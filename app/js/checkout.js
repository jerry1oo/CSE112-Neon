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




//create a list of goals that user saved in check-in
function createGoalList(goal, n) {

    // Assigning the attributes 
    var id = n.toString();
    var form = document.getElementById("line" + id);
    var labelId = "task" + id;
    var label = document.createElement('label');
    label.id = labelId;

    // appending the created text to  
    // the created label tag  
    var s = "";
    label.appendChild(document.createTextNode(goal + s));


    var brik = document.createElement('br');
    document.getElementById('h' + id).style.display = "block"
    var con = document.getElementById('container' + id);
    con.style.position = "absolute";
    con.style.right = "0";
    con.style.display = "inline-block";

    // appending the checkbox 
    // and label to div 
    form.appendChild(label);
    form.appendChild(con);
    form.appendChild(brik);
}


var taskNum = 1;


function updateGoal() {
    var n = 1;
    var goalText = document.getElementById("goalText");
    var docRef = db.collection("teams").doc(teamName).collection(uid).doc("status")
    docRef.get()
        .then(function (doc) {
            if (doc.exists) {
                // goalText.innerHTML = "Goal: " + doc.data().goal
                goalText.style.display = "none";
                var id = "goal";        //fix this to "task"+n.toString()
                var data = doc.data()
                while (id in data) {
                    createGoalList(data[id], n);
                    n++;
                    taskNum++;
                    id = "task" + n.toString();
                }
                createGoalList("yoyoyoyoyoyyo", n);
                n++;
                taskNum++;
                createGoalList("yoyoy", n)

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
    // var n = 1;
    //initialize the things to be pushed
    var obj = {
        checkedIn: false,
    }
    for (i = 1; i <= taskNum; i++) {
        var id = i.toString();

        var taskId = "task" + id;
        var taskStatus = "taskStatus" + id;
        var t = document.getElementById(taskId).textContent;

        obj[taskId] = t;
        obj[taskStatus] = 0;
        if (dict[i][k] == 0)
            obj[taskStatus] = 1;
        else if (dict[i][s] == 0)
            obj[taskStatus] = 2;
        else if (dict[i][b] == 0)
            obj[taskStatus] = 3;

    }
    docRef.set(obj)
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