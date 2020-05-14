const { app, BrowserWindow, ipcMain } = require('electron')
const psList = require('ps-list');

var win;
let checkInWin;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    checkInWin = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: { nodeIntegration: true },
        parent: win,
        show: false
    });

    // and load the index.html of the app.
    win.loadFile('./app/index.html');
    checkInWin.loadFile('app/checkIn.html');
}

app.whenReady().then(createWindow)

ipcMain.on('check-in-modal-trigger', (e, args) => {
    checkInWin.show();
});