import Phaser from "phaser"

import create from "./create"
import preload from "./preload"
import update from "./update"

const ChessScene = new Phaser.Scene()

ChessScene.preload = preload
ChessScene.create = create
ChessScene.update = update

export default ChessScene
