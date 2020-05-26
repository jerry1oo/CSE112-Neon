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

var joinTeamButton = document.getElementById("createBtn")
joinTeamButton.addEventListener("click", function() {
    console.log("Clicked")
    var teamName = document.getElementById("teamName").value
    console.log(teamName)
    console.log(teamName)

    db.collection("users").doc(uid).update({ "team": teamName}) 
    var obj = {}
    obj[uid] = true
    db.collection("teams").doc(teamName).set(obj)
        .then(function() {
            console.log("Document written");
            document.location.href = "taskbar.html"
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
})