const regexGUID = /\?guid=([\dA-z]*[-][\dA-z]*[-][\dA-z]*)/;
const guid = window.location.search.match(regexGUID)[1];
console.log(guid);

const firebaseConfig = {
  apiKey: 'AIzaSyBmn_tDSlm4lLdrvSqj8Yb00KkYae8cL-Y',
  authDomain: 'neon-pulse-development.firebaseapp.com',
  databaseURL: 'https://neon-pulse-development.firebaseio.com',
  projectId: 'neon-pulse-development',
  storageBucket: 'neon-pulse-development.appspot.com',
  messagingSenderId: '240091062123',
  appId: '1:240091062123:web:babe11f5f03ced38fbb62e',
  measurementId: 'G-VMS6JL8H4S',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user.uh);
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
}); */
const h3 = document.getElementById('loginstatus');

firebase.auth().getRedirectResult().then((result) => {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  const { user } = result;
  if (!user) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  } else {
    console.log(user);
    console.log(user.displayName);
    const id = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      guid,
    };
    console.log(id);
    const xhr = new XMLHttpRequest();
    const url = '/registerlogin';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const response = JSON.parse(xhr.response);
      }
    };
    xhr.send(JSON.stringify(id));
    h3.innerHTML = 'You have successfully logged in, please return to Neon Pulse.';
  }

  // window.close()
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const { email } = error;
  // The firebase.auth.AuthCredential type that was used.
  const { credential } = error;
  // ...
});
