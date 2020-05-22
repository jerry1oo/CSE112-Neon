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

var startFlowButton = document.getElementById("startFlowButton")
startFlowButton.addEventListener("click", () => startFlow())

function startFlow() {
    document.location.href = 'checkin.html'
}

var endFlowButton = document.getElementById("endFlowButton")
endFlowButton.addEventListener("click", () => endFlow())

function endFlow() {
    document.location.href = 'checkout.html'
}

var flowDiv = document.getElementById("flowDiv")
var teamDiv = document.getElementById("teamDiv")
flowDiv.style.display = "none"
teamDiv.style.display = "none"
endFlowButton.style.display = "none"

var teamName = ""
checkTeams()

function checkTeams() {
    db.collection("teams").where(uid, "==", true)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot.docs)
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    console.log("Team name: ", doc.id)
                    teamName = doc.id
                    checkStatus()
                });
                teamDiv.innerHTML = ""
                var h2 = document.createElement("h2")
                h2.innerHTML = teamName
                teamDiv.appendChild(h2)
            } else {
                teamDiv.style.display = "block"
                console.log("Team not found")
            }
        })
        .catch(function(error) {
            dialog.showMessageBox({
                type: 'error',
                title: 'Error',
                message: error.message
            });
            console.log("Error getting documents: ", error);
            document.location.href = 'signin.html'
        });
}

function checkStatus() {
    flowDiv.style.display = "block"
    teamDiv.style.display = "block"

    var docRef = db.collection("teams").doc(teamName).collection(uid).doc("status")
    docRef.get()
        .then(function(doc) {
            if (doc.exists) {
                if (doc.data().checkedIn) {
                    startFlowButton.style.display = "none"
                    endFlowButton.style.display = "block"
                }
            } else {
                console.error("Error getting data");
            }
        })
        .catch(function(error) {
            console.error("Error getting data: ", error);
        });
}

var createTeamButton = document.getElementById("createTeamButton")
createTeamButton.addEventListener("click", () => createTeam())

function createTeam() {
    document.location.href = "createteam.html"
}

var joinTeamButton = document.getElementById("joinTeamButton")
joinTeamButton.addEventListener("click", () => joinTeam())

function joinTeam() {
    console.log("Join Team")
    document.location.href = "jointeam.html"
}

var logoutButton = document.getElementById("logOutBtn")
logoutButton.addEventListener("click", function() {
    firebase.auth().signOut().then(function() {
        localStorage.removeItem('userid')
        localStorage.removeItem('email')
        localStorage.removeItem('displayName')
        document.location.href = 'signin.html'
    }).catch(function(error) {
        // Handle errors
        dialog.showMessageBox({
            type: 'error',
            title: 'Error',
            message: error.message
        });
        console.log(error);
    })
})