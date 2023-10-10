function initUI() {
	const backdrop = document.createElement("div")

	backdrop.classList.add("backdrop")
	backdrop.innerHTML = `
	<div class="modal">
		<h1>Create a game</h1>
		<button class="create-game-btn">Create Game</button>
	</div>
	`
	document.body.appendChild(backdrop)
}

export default initUI
