import Phaser from "phaser"
import grid from "../assets/grid.png"
import rook from "../assets/player-idle.png"
import endpoint from "../assets/end.png"

const ChessScene = new Phaser.Scene()
ChessScene.preload = function () {
	this.load.image("player", rook)
	this.load.image("endpoint", endpoint)
	this.load.image("grid", grid)
	this.load.image("gridBottom", grid)
}

ChessScene.create = function () {
	// Grid
	const gridTop = this.add.sprite(0, 0, "grid")
	gridTop.setOrigin(0, 0)
	gridTop.displayWidth = this.sys.game.config.width
	gridTop.displayHeight = this.sys.game.config.height / 2
	const gridBottom = this.add.sprite(0, this.sys.game.config.height / 2, "grid")
	gridBottom.setOrigin(0, 0)
	gridBottom.displayWidth = this.sys.game.config.width
	gridBottom.displayHeight = this.sys.game.config.height / 2

	// Boxes
	let createBox = true
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if (createBox) {
				let sqr = this.add.rectangle(i * 40 + 20, j * 40 + 160, 40, 40, 0xffffff, 0.15)
				sqr.setOrigin(0, 0)
			}
			if (j !== 7) {
				createBox = !createBox
			}
		}
	}

	// Rook
	const boxSize = 40
	const padding = 20
	const verticalBoxGap = 4
	const toCenter = { x: 6, y: 5.5 }
	this.rook = this.add
		.sprite(7 * boxSize + padding + toCenter.x, 0 + verticalBoxGap * boxSize + toCenter.y, "player")
		.setInteractive()
	this.rook.setOrigin(0, 0)

	// Endpoint
	this.endpoint = this.add.sprite(padding + 22, 12 * boxSize - 18, "endpoint")
	this.endpoint.setOrigin(0.5, 0.5)

	// Pointers
	this.rook.on("pointerdown", function (ptr) {
		console.log(ptr)
	})
}
ChessScene.update = function () {
	this.endpoint.angle += 1
}

export default ChessScene