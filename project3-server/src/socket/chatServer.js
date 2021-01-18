import sock from 'socket.io'
import {pushSocketIdToArray, removeSocketIdFromArray} from '../functions/socketHelpers'


const chatServer = sock(4003, {path:'/chat'})
chatServer.engine.generateId = req => {
    return req._query.userId
}

let clients = []

chatServer.on("connection", socket => {

    socket.on('join-room-chat', (data) => {
 
        data.memberGroup.forEach(member => {
            if (socket.id === member) {
                socket.join(data.idGroup)
            }
        })
    })

    socket.on('send-mess-group', (data) => {
        socket.to(data.idGroup).emit('res-send-mess-group', {senderId: data.senderId, senderName: data.senderName, content: data.content})
    })

    socket.on('create-new-group', (data) => {
        if (data.status === true) {
            socket.emit('res-create-new-group', data)
        }
    })

    socket.on('join-group', (data) => {
        if (data.status === true) {
            socket.emit('res-join-group', data)
        }
    })
        
    socket.on("disconnect", () => {

    })
    global.chatSocket = socket
})





export default chatServer