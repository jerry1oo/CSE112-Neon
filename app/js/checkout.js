const { dialog } = require('electron').remote;

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
const db = firebase.firestore();
const uid = localStorage.getItem('userid');
let teamName = '';

checkTeams();

function checkTeams() {
  const errorMessage = 'An error occurred when trying to find your team, returning to main page.';
  db.collection('teams').where(uid, '==', true)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot.docs);
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          teamName = doc.id;
        });
        updateGoal();
      } else {
        dialog.showMessageBox({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        console.log('Team not found');
        document.location.href = 'taskbar.html';
      }
    })
    .catch((error) => {
      dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
      console.log('Error getting documents: ', error);
      document.location.href = 'taskbar.html';
    });
}


// create a list of goals that user saved in check-in
function createGoalList(goal, n) {
  // Assigning the attributes
  const id = n.toString();
  const form = document.getElementById(`line${id}`);
  const label = document.createElement('label');
  const labelId = `task${id}`;
  const con = document.getElementById(`container${id}`);


  // appending the created text to
  // the created label tag
  const s = '';
  label.appendChild(document.createTextNode(goal + s));
  label.id = labelId;


  document.getElementById(`h${id}`).style.display = 'block';

  con.style.position = 'absolute';
  con.style.right = '0';
  con.style.display = 'inline-block';

  // appending label to div
  form.appendChild(label);
  form.appendChild(con);
}


let taskNum = 1;


function updateGoal() {
  let n = 1;
  const goalText = document.getElementById('goalText');
  const docRef = db.collection('teams').doc(teamName).collection(uid).doc('status');
  docRef.get()
    .then((doc) => {
      if (doc.exists) {
        goalText.style.display = 'none';
        let id = `task${n.toString()}`;
        const data = doc.data();
        while (id in data & data[id] != '') {
          createGoalList(data[id], n);
          n++;
          taskNum++;
          id = `task${n.toString()}`;
        }
        if (n == 1) {
          goalText.innerHTML = 'No Task Set For The Day!';
          goalText.style.display = 'block';
        }
      } else {
        console.error('Error getting data');
      }
    })
    .catch((error) => {
      dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
      console.error('Error getting data: ', error);
      document.location.href = 'taskbar.html';
    });
}

const endFlowButton = document.getElementById('endFlowBtn');
endFlowButton.addEventListener('click', () => endFlow());

function endFlow() {
  const docRef = db.collection('teams').doc(teamName).collection(uid).doc('status');
  // initialize the things to be pushed
  const obj = {
    checkedIn: false,
  };
  for (i = 1; i < 4; i++) {
    const id = i.toString();
    const taskId = `task${id}`;
    const taskStatus = `taskStatus${id}`;
    const element = document.getElementById(taskId);
    if (element != null) {
      const t = element.textContent;

      // obj[taskId] = t;
      obj[taskStatus] = 0;
      if (dict[i][k] == 0) { obj[taskStatus] = 1; } else if (dict[i][s] == 0) { obj[taskStatus] = 2; } else if (dict[i][b] == 0) { obj[taskStatus] = 3; }

      if (obj[taskStatus] == 0) { obj[taskId] = ''; } else { obj[taskId] = t; }
    } else {
      obj[taskId] = '';
    }
  }
  docRef.set(obj)
    .then(() => {
      console.log('Document written');
      document.location.href = 'taskbar.html';
    })
    .catch((error) => {
      dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
      console.error('Error adding document: ', error);
      document.location.href = 'taskbar.html';
    });
}
