

export let pushSocketIdToArray = (clients, socketId) => {
    if (clients.indexOf(socketId) === -1) {
        clients.push(socketId)
    }
    return clients
}

export let removeSocketIdFromArray = (clients, socketId) => {
    clients.filter(client => {
        return client !== socketId
    })
}

// export let pushSocketIdToArray = (clients, userId, socketId) => {
//     if (clients[userId]) {
//         clients[userId] = socketId
//     } else {
//         clients[userId] = [socketId]
//     }

//     return clients
// }

// export let emitNotifyToArray = (clients, userId, io, eventName, data) => {
//     //Example: Client openning multi tab
//     clients[userId].forEach(socketId => {
//         io.sockets.connected[socketId].emit(eventName, data);
//     });

// }

// export let removeSocketIdFromArray = (clients, userId, socket) => {
//     //remove socket id when socket disconnect
//     clients[userId] = clients[userId].filter(socketId => {
//         return socketId !== socket.id;
//     });

//     if (!clients[userId].length) {
//         delete clients[userId];
//     }

//     return clients;
// }
