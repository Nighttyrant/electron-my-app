const {create: createMainWindow} = require('./window/main')
const {addIpc} = require('./ipc')


function main () {
    createMainWindow()
    addIpc()
}

main()