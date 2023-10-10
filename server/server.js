const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

io.on("connection", (client) => {
	console.log("User connected: ", client.id)
})

server.listen(3000, () => {
	console.log("server active on port 3000")
})
