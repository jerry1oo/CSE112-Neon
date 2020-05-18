//vscode - status
const psList = require('ps-list');

const WIN_VS_CODE_PROCESS_NAME = "Code.exe";

var intervalVar
var vsCodeStatus = false

let pText = document.querySelector('#vscode-status')
let numText = document.querySelector('#vscode-num')
console.log(pText)

intervalVar = setInterval(isVSCodeOpen, 50)

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
var logOutBtn = document.getElementById('logOutBtn');

logOutBtn.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
        localStorage.removeItem('userid')
        document.location.href = 'login.html'
    }).catch(function(error) {
        // Handle errors
        dialog.showMessageBox({
            type: 'error',
            title: 'Error',
            message: error.message
        });
        console.log(error);
    })
});

async function isVSCodeOpen() {
    var list = await psList()
    var names = []
    var codes = []
    for (var i = 0; i < list.length; i++) {
        names.push(list[i].name)

        // Windows does not support cmd key returned by ps-list
        // darwin means we are on macOS
        if (process.platform == "darwin") {
            var lowercase = list[i].name.toLowerCase()
            if (lowercase.indexOf("applications") >= 0) {
                if (list[i].cmd.split("/")[2] === "Visual Studio Code.app") {
                    codes.push(list[i].cmd.split("/")[2])
                }
            }
        }
        // Even if we're not on 32-bit, the key is still win-32 lol
        else if (process.platform == "win32") {
            if (list[i].name == WIN_VS_CODE_PROCESS_NAME) {
                codes.push(list[i].name);
            }
        }
    }
    if (codes.length > 0) {
        /*win.webContents.executeJavaScript(`
            document.getElementById("vscode-status") = "open"
        `)*/
        pText.innerHTML = "Open"
        numText.innerHTML = codes.length
        if (!vsCodeStatus) {
            vsCodeOpened()
            vsCodeStatus = true
        }
    } else {
        /*win.webContents.executeJavaScript(`
            document.getElementById("vscode-status") = "closed"
        `)*/
        pText.innerHTML = "Closed"
        numText.innerHTML = 0
        if (vsCodeStatus) {
            vsCodeClosed()
            vsCodeStatus = false
        }
    }
}

function vsCodeOpened() {
    console.log("VSCode has just been opened")
    var userid = localStorage.getItem('userid')
    console.log("Userid is: ", userid)
    db.collection("vscode").doc(userid).set({
            loggedin: true
        }).then(function(docRef) {
            console.log(docRef)
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

function vsCodeClosed() {
    console.log("VSCode has just been closed")
    var userid = localStorage.getItem('userid')
    console.log("Userid is: ", userid)
    db.collection("vscode").doc(userid).set({
            loggedin: false
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
