
let io;

module.exports = {
    init : httpServer => {
        io = require("socket.io")(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST" , "PUT", "DELETE", "PATCH"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });

        return io;
    },

    getIO : () => {
        if(!io) {
            throw new Error('Socket.io not initailized');
        }
        return io;
    }
}