const { app, BrowserWindow } = require('electron')
const psList = require('ps-list');
const express = require('express');
var path = require('path')
var bodyParser = require('body-parser')

const expressApp = express();
const port = 3000;

var guidToIDMap = {}

expressApp.use(express.static(__dirname + '/'))
    .use(bodyParser.json())

/*expressApp.get('/test', function(req, res) {
    var options = {
        root: path.join(__dirname)
    }
    res.sendFile('signin.html', options)
})*/

expressApp.post('/registerlogin', function(req, res) {
    console.log('Registering login')
    console.log(req.body)
    var guid = req.body.guid
    guidToIDMap[guid] = req.body
    res.send({})
})

expressApp.get('/checklogin', function(req, res) {
    if (req.query.guid) {
        if (guidToIDMap[req.query.guid]) {
            res.send(guidToIDMap[req.query.guid])
        } else {
            res.send({})
        }
    } else {
        res.send({})
    }
})

expressApp.listen(port, () => { console.log("Server running") })



var intervalVar
var vsCodeStatus = false

var win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('./app/signin.html')
        //win.loadURL('http://localhost:3000/signin.html')
}


app.whenReady().then(createWindow)