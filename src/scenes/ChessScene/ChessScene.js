import Phaser from "phaser"

import create from "./create"
import preload from "./preload"
import update from "./update"

const ChessScene = new Phaser.Scene()

const gameState = {
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

export default ChessScene
