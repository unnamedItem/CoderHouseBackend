function configSocket(socket) {
    socket.on('connection', socket => {
        console.log('new client connected');
    })
}

export default configSocket;