const app = require("express")()
const server = require("http").createServer(app)
const { Server: Socket } = require("socket.io")
const { v4: uuid } = require("uuid")

const io = new Socket(server, {
	cors: ["http://localhost:5173"], // WS cors configuration
})

const GAMES = {}

io.on("connection", (client) => {
	console.log("User connected: ", client.id)

	client.on("create-game", () => {
		const roomName = uuid().split("-")[0]
		console.log("Roomname is :", roomName)
		client.join(roomName)
		client.emit("game-created", roomName)
	})

	client.on("join-game", (gameCode) => {
		const roomExists = io.sockets.adapter.rooms.has(gameCode)
		if (roomExists) {
			client.join(gameCode)
			const players = Array.from(io.sockets.adapter.rooms.get(gameCode))
			createGame(players, gameCode)
			players.forEach((player) => {
				const gameState = { playerMove: GAMES[gameCode].currentPlayer === player }
				io.to(player).emit("ready", gameState)
			})
			return
		}
		client.emit("wrong-code")
	})
})

function createGame(players, gameCode) {
	GAMES[gameCode] = {
		currentPlayer: players[0],
		nextPlayer: players[1],
		currentRookPosition: 8,
	}
}

server.listen(3000, () => {
	console.log("server active on port 3000")
})
