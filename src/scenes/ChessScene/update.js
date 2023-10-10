export default function update(gameState) {
	// Handles endpoint rotation
	this.endpoint.angle += 1

	// Handles move sign overlays
	if (gameState.validMoves.length > 0 && !gameState.movesOverlay) {
		const grp = this.add.group()
		gameState.validMoves.forEach((move) => {
			const pos = getRenderPosition(move)
			const moveSign = this.add.sprite(pos.x, pos.y, "validmove").setInteractive()
			moveSign.setOrigin(0, 0)
			moveSign.on("pointerdown", (ptr) => {
				gameState.moveTo = pos.chessSquare
				gameState.validMoves = []
				gameState.moving = true
				grp.clear(true)
				gameState.movesOverlay = false
			})
			grp.add(moveSign)
		})
		gameState.movesOverlay = true
	}

	// Handles rook move
	if (gameState.moveTo && gameState.moving) {
	}
}

function getRenderPosition(chessSquare) {
	const size = 40
	const padding = 20
	const verticalGap = 4
	const center = {
		x: 4.5,
		y: 4.5,
	}
	let x = padding + ((chessSquare - 1) % 8) * size + center.x
	let y = verticalGap * size + parseInt((chessSquare - 1) / 8) * size + center.y

	return { chessSquare, x, y }
}
