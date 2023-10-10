import Phaser from "phaser"
import socket from "../../socket"

import create from "./create"
import preload from "./preload"
import update from "./update"

const ChessScene = new Phaser.Scene()

const gameState = {
	gameCode: null,
	playerMove: true,
	currentPosition: 8,
	validMoves: [],
	moveTo: 8,
	moving: false,
	movesOverlay: false,
}

ChessScene.preload = preload.bind(ChessScene, gameState)
ChessScene.create = create.bind(ChessScene, gameState)
ChessScene.update = update.bind(ChessScene, gameState)
ChessScene.timer = null

// Socket events to manipulate gameState
socket.on("ready", (payload) => {
	gameState.gameCode = payload.gameCode
	gameState.playerMove = payload.playerMove
	if (gameState.playerMove) {
		ChessScene.timer = setTimeout(() => {
			socket.emit("lost-time")
		}, 30 * 1000)
	}
	socket.off("ready")
})

socket.on("opponent-moved", (moveTo) => {
	gameState.moveTo = moveTo
	gameState.moving = true
})

socket.on("ready-next-move", (move) => {
	gameState.playerMove = move.playerMove
})
export default ChessScene
