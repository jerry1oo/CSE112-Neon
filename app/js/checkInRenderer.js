const {remote} = require('electron')

document.getElementById('check-in-form').addEventListener('submit', () => {
    let window = remote.getCurrentWindow();
    window.close();
});
