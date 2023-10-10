import grid from "../../assets/grid.png"
import rook from "../../assets/player-idle.png"
import endpoint from "../../assets/end.png"
import validMove from "../../assets/validmove.png"

export default function preload() {
	this.load.image("player", rook)
	this.load.image("endpoint", endpoint)
	this.load.image("grid", grid)
	this.load.image("validmove", validMove)
}
