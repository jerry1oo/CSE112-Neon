const {ipcRenderer} = require('electron')

let startFlowBtn = document.getElementById('btn-start-flow');

startFlowBtn.addEventListener('click', function() {
    ipcRenderer.send('check-in-modal-trigger');
})
