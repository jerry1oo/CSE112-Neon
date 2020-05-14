const {remote} = require('electron')

document.getElementById('check-in-form').addEventListener('submit', e => {
    let window = remote.getCurrentWindow();
    window.close();
});
