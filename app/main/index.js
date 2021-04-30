const {create: createMainWindow} = require('./window/main')
const {create: createControllerWindow} = require('./window/control')
const {addIpc} = require('./ipc')


function main () {
    createControllerWindow()
}

main()