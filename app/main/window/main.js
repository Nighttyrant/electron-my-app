const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win
function create () {
    app.on('ready', () => {
        win = new BrowserWindow({
            width: 600, height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
        win.webContents.openDevTools()
        if (isDev) {
            win.loadURL('http://localhost:3000')
        } else {
            win.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'))
        }
    })
}

function send (channel, ...args) {
    win.webContents.send(channel, ...args)
}

module.exports = {create, send}