import socket from "./socket"

function initUI() {
	const backdrop = document.createElement("div")

	backdrop.classList.add("backdrop")
	backdrop.innerHTML = `
	<div class="modal">
		<h1>Create Game</h1>
		<button class="create-game-btn">Create Game</button>
		<div class="join-game-form">
			<h1>Join Game</h1>
			<input type="text" class="join-game-input" placeholder="Game Code">
			<p class="error"></p>
			<button class="join-game-btn">Join Game</button>
		</div>
	</>
	`
	document.body.appendChild(backdrop)

	// Create game
	const createGameButton = document.querySelector(".create-game-btn")
	createGameButton.addEventListener("click", () => {
		createGame()
		createGameButton.disabled = true
		createGameButton.innerText = "Creating Game.."
	})

	// Join game
	const joinGameButton = document.querySelector(".join-game-btn")
	joinGameButton.addEventListener("click", () => {
		socket.on("wrong-code", () => {
			const error = document.querySelector(".error")
			error.innerText = "Wrong Room Code"
			socket.off("wrong-code")
		})
		joinGame()
	})

	// Both players ready
	socket.on("ready", () => {
		backdrop.remove()
	})

	socket.on("time-win", (winnerId) => {
		let isWinner = false
		if (winnerId === socket.id) {
			isWinner = true
		}
		if (this?.timer) {
			clearTimeout(this.timer)
		}
		backdrop.innerHTML = timeWinnerUI(isWinner)
		document.body.appendChild(backdrop)
	})
}

function createGame() {
	socket.emit("create-game")
	socket.on("game-created", (gameCode) => {
		const modal = document.querySelector(".modal")
		modal.innerHTML = createdGameUI(gameCode)
		socket.off("game-created")
	})
}

function timeWinnerUI(isWinner) {
	if (isWinner) {
		return `
		<div class="modal">
			<h1>You Won On Time !</h1>
		</div>
		`
	}
	return `
	<div class="modal">
		<h1>You Lost On Time !</h1>
	</div>
	`
}

function createdGameUI(roomCode) {
	return `
	<h1>Waiting for Player 2</h1>
	Game Code: ${roomCode}
	`
}

function joinGame() {
	const input = document.querySelector(".join-game-input")
	const roomCode = input.value
	if (!roomCode) return
	socket.emit("join-game", roomCode)
}

export function setWinnerUI(isWinner) {
	const winUI = `
	<div class="modal">
		<h1>You Won !</h1>
	</div>
	`
	const lostUI = `
	<div class="modal">
		<h1>You Lost !</h1>
	</div>
	`
	const backdrop = document.createElement("div")
	backdrop.classList.add("backdrop")
	backdrop.innerHTML = isWinner ? winUI : lostUI
	document.body.appendChild(backdrop)
}

export default initUI
