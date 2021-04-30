const EventEmitter = require('events')
const peer =  new EventEmitter()
const {desktopCapturer} = require('electron')

async function loadSteam () {
    const sources = await desktopCapturer.getSources({types: ['screen']})
    navigator.webkitGetUserMedia({
        audio: false, 
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        }
    }, (stream) => {
        peer.emit('add-stream', stream)
    }, (error) => {
        console.log(error)
    })
}
loadSteam()
module.exports = peer