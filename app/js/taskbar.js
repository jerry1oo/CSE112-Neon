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

checkTeams()

function checkTeams() {
    db.collection("teams").where(uid, "==", true)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot.docs)
            if (querySnapshot.docs.length > 0) {
                var teamName = ""
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    console.log("Team name: ", doc.id)
                    teamName = doc.id
                });
                var rightContainer = document.getElementById("right")
                rightContainer.innerHTML = ""
                var h2 = document.createElement("h2")
                h2.innerHTML = teamName
                rightContainer.appendChild(h2)
            } else {
                console.log("Team not found")
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

var createTeamButton = document.getElementById("createTeamButton")
createTeamButton.addEventListener("click", () => createTeam())

function createTeam() {
    console.log("Creating team")
    var rightContainer = document.getElementById("right")
    rightContainer.innerHTML = ""
    var h2 = document.createElement("h2")
    h2.innerHTML = "Create team"
    var inpElement = document.createElement("input")
    inpElement.id = "inpElement"
    inpElement.placeholder = "Enter team name"
    var buttonElement = document.createElement("button")
    buttonElement.innerHTML = "Submit team"
    buttonElement.onclick = function() {
        var teamName = document.getElementById("inpElement").value
        console.log(teamName)

        var obj = {}
        obj[uid] = true
        db.collection("teams").doc(teamName).set(obj)
            .then(function() {
                console.log("Document written");
                checkTeams()
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }
    rightContainer.appendChild(h2)
    rightContainer.appendChild(inpElement)
    rightContainer.appendChild(buttonElement)
}

var joinTeamButton = document.getElementById("joinTeamButton")
joinTeamButton.addEventListener("click", () => joinTeam())

function joinTeam() {
    console.log("Join Team")
    var rightContainer = document.getElementById("right")
    rightContainer.innerHTML = ""
    var h2 = document.createElement("h2")
    h2.innerHTML = "Join team"
    var inpElement = document.createElement("input")
    inpElement.id = "inpElement"
    inpElement.placeholder = "Enter team name"
    var buttonElement = document.createElement("button")
    buttonElement.innerHTML = "Submit team"
    buttonElement.onclick = function() {
        var teamName = document.getElementById("inpElement").value
        db.collection("teams").doc(teamName)
            .get()
            .then(function(querySnapshot) {
                console.log(querySnapshot)
                console.log(querySnapshot.data())
                var obj = querySnapshot.data()
                if (obj) {
                    console.log("Team exists")
                    obj[uid] = true
                    db.collection("teams").doc(teamName).set(obj)
                        .then(function() {
                            console.log("Document written");
                            checkTeams()
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        })
                } else {
                    alert("Team doesn't exist")
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    rightContainer.appendChild(h2)
    rightContainer.appendChild(inpElement)
    rightContainer.appendChild(buttonElement)
}