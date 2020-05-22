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

var status_emoji = {
    'Online': '😀',
    'Offline': '😴',
    'Coding': '👨‍💻',
    'Researching': '👀',
    'Documenting': '📝',
    'Meeting': '👥'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// User info
var uid = localStorage.getItem('userid')
var uname = localStorage.getItem('displayName')

//Create user doc if not present in firebase, 
//if the user is present, this will simply updates its status to online
db.collection("users").doc(uid).update({ 
    "displayName": uname,
    "userStatus": 'Online'})
.catch(function(error) {
    console.error("Error when initializing user: ", error);
});

// Top user information logistics
document.getElementById('username').innerHTML = uname;
document.getElementById("userStatus").onchange = function(){
    var value = document.getElementById("userStatus").value;
    db.collection("users").doc(uid).update({
        "userStatus": value
    })
    .catch(function(error) {
        console.error("Error attempting to change user status: ", error);
    });
 };

// Top right log out button logistics
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

// Left column logistics
var startFlowButton = document.getElementById("startFlowButton")
startFlowButton.addEventListener("click", () => startFlow())

var endFlowButton = document.getElementById("endFlowButton")
endFlowButton.addEventListener("click", () => endFlow())

var flowDiv = document.getElementById("flowDiv")
var teamDiv = document.getElementById("teamDiv")
flowDiv.style.display = "none"
teamDiv.style.display = "none"
endFlowButton.style.display = "none"

function startFlow() { document.location.href = 'checkin.html' }
function endFlow() { document.location.href = 'checkout.html' }


// Right column logistics
var teamName;
var createTeamButton = document.getElementById("createTeamButton")
createTeamButton.addEventListener("click", () => createTeam())
var joinTeamButton = document.getElementById("joinTeamButton")
joinTeamButton.addEventListener("click", () => joinTeam())

checkTeams()

/* Check if the user is already in a team. 
 * If so, join the team automatically
 */
function checkTeams() {
    db.collection("teams").where(uid, "==", true).get()
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
                getTeamStatus()
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


function getTeamStatus() {
    db.collection("users").where("team", "==", teamName).get() 
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                console.log(doc.get("userStatus"));
                var displayName = doc.get("displayName");
                var status = doc.get("userStatus");
               
                //if (displayName != uname) {
                    addTeamMember(displayName,status);
                    addStatusListener(doc.id); 
                //}
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
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

function createTeam() {
    document.location.href = "createteam.html"
}

function joinTeam() {
    console.log("Join Team")
    document.location.href = "jointeam.html"
}

//Utility functions

/* Adds the team member to the team div on UI
 * name: user's name to display
 * status: user's status, in string
 */
function addTeamMember(name, status){
    console.log("Adding member " + name + ", status: " + status);
    var init = false;
    var namelist = document.getElementById("name_list");
    if(namelist == null){
        init = true;
        namelist = document.createElement("UL");
        namelist.id = 'name_list';
    }
    var member_elem = document.createElement("LI");
    member_elem.innerHTML = name;
    member_elem.id = "name_" + name;
    namelist.appendChild(member_elem);
    if(init) {teamDiv.appendChild(namelist);}

    init = false;
    var statuslist = document.getElementById("status_list");
    if(statuslist == null){
        init = true;
        statuslist = document.createElement("UL");
        statuslist.id = 'status_list';
    }
    var status_elem = document.createElement("LI");
    status_elem.innerHTML = status_emoji[status];
    status_elem.id = "status_" + name;
    statuslist.appendChild(status_elem);
    if(init) {teamDiv.appendChild(statuslist);}
}

/* Adds a listener to the status of the given user with id
 * id: user's id
 */ 
function addStatusListener(id) {
    db.collection("users").doc(id)
    .onSnapshot(function(doc) {
        var displayName = doc.get("displayName");
        var status = doc.get("userStatus");
        console.log(displayName + " change status to " + status);
        onStatusChange(displayName, status)
    });
}

/* Change the status of the team member on UI
 * name: user's name
 * status: user's new status
 */
function onStatusChange(name, status){
    var status_elem = document.getElementById("status_" + name);
    if(status_elem != null){
        status_elem.classList.add('hide');
        setTimeout(function() { 
            status_elem.innerHTML = status_emoji[status];
        }, 500);
        setTimeout(function() { 
            status_elem.classList.remove('hide')
        }, 500);   
    }
}