const {create: createControllerWindow} = require('./window/control')
const {send: sendMainWindow} = require('./window/main')
const {ipcMain} = require('electron')

function addIpc () {
    ipcMain.handle('login', async () => {
        return 'czf' + Math.floor(Math.random() * (999999 - 100000)) + 1000000
    })

    ipcMain.on('control', async (e, remoteCode) => {
        //这里是用户发起链接请求，我们先返回测试事件
        sendMainWindow('control-state-change', remoteCode, 1)
        createControllerWindow()
    })
}

module.exports = {addIpc}