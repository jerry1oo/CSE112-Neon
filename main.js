const { app, BrowserWindow } = require('electron')
const psList = require('ps-list');

var intervalVar
var vsCodeStatus = false

var win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        maxHeight: 300,
        transparent: true,
        opacity: 0.8,
        resizable: false,
        minimizable: false,
        maximizable: false,
        fullscreen: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('./overlay.html')
}


app.whenReady().then(createWindow)