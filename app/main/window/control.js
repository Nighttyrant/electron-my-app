const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')

let win

function create() {
    app.on('ready', () => {
        win = new BrowserWindow({
            width: 800,
            height: 1000,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
        win.webContents.openDevTools({mode:'detach'})
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))
    })
}

module.exports = {
    create
}