import io from 'socket.io'

const notifyServer = io(4002, { path: '/notify' })
console.log(process.env.VIDEO_PORT)
notifyServer.engine.generateId = req => {
    return req._query.userId
}
notifyServer.on("connection", socket => {

    socket.on('start_a_call', dt => {
        let data = JSON.parse(dt)
        notifyServer.to(data.calleeId).emit("receive_a_call", {
            callerId: data.callerId,
            callerName: data.callerName,
            callerPeerId: data.peerId 
        })
    })
    socket.on('reply_peer_id_when_receive_all_call', dt => {

        notifyServer.to(dt.callerId).emit('receive_reply_peerId', {
            calleePeerId: dt.calleePeerId
        })
    })

    socket.on('end-call', dt => {
        notifyServer.to(dt.calleeId).emit('end-call')
    })
    socket.on('is_in_call', dt => {
        notifyServer.to(dt.callerId).emit('receive_callee_busy', {
            calleeName: dt.calleeName
        })
    })
    
    
    // group
    // socket.on('start_a_group_call', dt => {
    //     socket.join(dt.groupId)
    // })
    socket.on('join_group_call', dt => {
        // console.log("MEMBER JOIN: ", dt)
        socket.join(dt.groupId)
        socket.to(dt.groupId).emit('member_join', dt)
        socket.on('quit-group-call',() => {
            console.log("Has one disconnect")            
            socket.to(dt.groupId).emit('member_quit', dt )
            socket.leave(dt.groupId)
        })
    })
    
    socket.on("disconnect", () => {

    })
    
    
    global.notifySocket = socket
    
})




export default notifyServer