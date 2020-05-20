const { dialog } = require('electron').remote;
const { shell } = require('electron');

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

var signInBtn = document.getElementById('signInBtn');

function guidVal() {
    let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4();
}
var intervalVar
signInBtn.addEventListener('click', () => {
    var guid = this.guidVal()
    intervalVar = setInterval(() => {
        var xhr = new XMLHttpRequest();
        var url = "/checklogin?guid=" + guid
        xhr.open("get", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Response is")
                console.log(xhr.response)
                var response = JSON.parse(xhr.response)
                if (response.guid) {
                    console.log("Successfully logged in")
                    clearInterval(intervalVar)
                    localStorage.setItem('userid', response.uid)
                    localStorage.setItem('displayName', response.displayName)
                    localStorage.setItem('email', response.email)
                    document.location.href = 'taskbar.html';
                }
            }
        }
        xhr.send();
    }, 1000);
    console.log("Signing in")

    var url = 'http://localhost:3000/googlesignin.html?guid=' + guid
    shell.openExternal(url)

    //var provider = new firebase.auth.GoogleAuthProvider();
    //firebase.auth().signInWithRedirect(provider);
    /*firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });*/
    /*var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user.user.uid)
        localStorage.setItem('userid', user.user.uid)
        document.location.href = 'taskbar.html';
    }).catch(function(error) {
        // Handle errors
        dialog.showMessageBox({
            type: 'error',
            title: 'Error',
            message: error.message
        });
        console.log(error);
    });*/
});