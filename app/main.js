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
        frame: false,
        show: false
    });

    // and load the index.html of the app.
    win.loadFile('./app/index.html');

    // Loading the checkInWindow
    checkInWin.loadFile('app/checkIn.html');
    // Put check in window on top of other screens -- not working on fullscreen
    checkInWin.setAlwaysOnTop(true, "floating", 1);
    checkInWin.setVisibleOnAllWorkspaces(true);
}

app.whenReady().then(createWindow)

ipcMain.on('check-in-modal-trigger', () => {
    checkInWin.show();
});
