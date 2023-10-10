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

// Socket events to manipulate gameState
socket.on("ready", (payload) => {
	gameState.gameCode = payload.gameCode
	gameState.playerMove = payload.playerMove
	socket.off("ready")
})

socket.on("opponent-moved", (moveTo) => {
	gameState.moveTo = moveTo
	gameState.moving = true
})

export default ChessScene
