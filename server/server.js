const app = require("express")()
const server = require("http").createServer(app)
const { Server: Socket } = require("socket.io")

const io = new Socket(server, {
	cors: ["http://localhost:5173"], // WS cors configuration
})

io.on("connection", (client) => {
	console.log("User connected: ", client.id)
})

server.listen(3000, () => {
	console.log("server active on port 3000")
})
