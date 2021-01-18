import io from 'socket.io'

const videoServer = io(4004, { path: '/video-call' })
videoServer.engine.generateId = req => {
    return req._query.userId
}

videoServer.on('connection', socket => {
    console.log(socket.id, " connnect to video call socket server")

    socket.on('start_a_call', dt => { 
        let data = JSON.parse(dt)
        videoServer.to(data.calleeId).emit("receive_a_call", {
            callerId: data.callerId,
            callerName: data.callerName,
            callerPeerId: data.peerId 
        })
        
    })
    socket.on('busying', dt => {
        videoServer.to(dt.callerId).emit('callee_busying', {calleeName: dt.calleeName})
    })
    socket.on('reply_peerId', dt => {
        console.log(dt)
        videoServer.to(dt.callerId).emit('receive_reply_peerId', {
            calleePeerId: dt.peerId
        })
    })
    socket.on('end-call', dt => {
        videoServer.to(dt.calleeId).emit('end-call')
    })
})

export default videoServer