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
    'online': '😀',
    'offline': '😴',
    'coding': '👨‍💻',
    'researching': '👀',
    'documenting': '📝',
    'meeting': '👥'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var uid = localStorage.getItem('userid')
var uname = localStorage.getItem('displayName')
document.getElementById('username').innerHTML = uname;

document.getElementById("userStatus").onchange = function(){
    var value = document.getElementById("userStatus").value;
    db.collection("users").doc(uid).set({
        "displayName": uname,
        "team": teamName,
        "userStatus": value
    },{merge: true})
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
 };
function updateTeamStatus() {
    db.collection("users").where(uid, "==", teamName)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var displayName = doc.get("displayName");
            var status = doc.get("userStatus");
            console.log(displayName)
            onStatusChange(displayName, status)
        });
    });
}

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
                status = status.toLowerCase();
                if (displayName != name) {
                addTeamMember(displayName,status);
                updateTeamStatus() 
                }
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

var createTeamButton = document.getElementById("createTeamButton")
createTeamButton.addEventListener("click", () => createTeam())

function createTeam() {
    console.log("Creating team")
    var teamDiv = document.getElementById("teamDiv")
    teamDiv.innerHTML = ""
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
    teamDiv.appendChild(h2)
    teamDiv.appendChild(inpElement)
    teamDiv.appendChild(buttonElement)
}

var joinTeamButton = document.getElementById("joinTeamButton")
joinTeamButton.addEventListener("click", () => joinTeam())

function joinTeam() {
    console.log("Join Team")
    var teamDiv = document.getElementById("teamDiv")
    teamDiv.innerHTML = ""
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
                    dialog.showMessageBox({
                        type: 'error',
                        title: 'Error',
                        message: "Team does not exist."
                    });
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    teamDiv.appendChild(h2)
    teamDiv.appendChild(inpElement)
    teamDiv.appendChild(buttonElement)
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

function addTeamMember(name, status){
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