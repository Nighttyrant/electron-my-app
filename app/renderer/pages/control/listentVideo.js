const peer = require('./peer')

peer.on('add-stream', (stream) => {
    play(stream)
})

function play (stream) {
    let video = document.getElementById('mainVideo')
    video.srcObject = stream
    video.onloadedmetadata = function (e) {
        video.play()
    }
}



