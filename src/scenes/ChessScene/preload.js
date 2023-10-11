import grid from "../../assets/grid.png"
import rook from "../../assets/player-idle.png"
import endpoint from "../../assets/end.png"
import validMove from "../../assets/validmove.png"
import playerAvatar from "../../assets/player-avatar.png"
import opponentAvatar from "../../assets/opponent-avatar.png"

export default function preload() {
	this.load.image("player", rook)
	this.load.image("endpoint", endpoint)
	this.load.image("grid", grid)
	this.load.image("validmove", validMove)
	this.load.image("playeravatar", playerAvatar)
	this.load.image("opponentavatar", opponentAvatar)
	this.load.plugin(
		"rexcircularprogressplugin",
		"https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogressplugin.min.js",
		true
	)
}
