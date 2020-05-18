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

var signInBtn = document.getElementById('signInBtn');
var signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', function() {
    document.location.href = 'signup.html';
});

signInBtn.addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user.user.l)
        localStorage.setItem('userid', user.user.l)
        document.location.href = 'taskbar.html';
    }).catch(function(error) {
        // Handle errors
        dialog.showMessageBox({
            type: 'error',
            title: 'Error',
            message: error.message
        });
        console.log(error);
    });
});