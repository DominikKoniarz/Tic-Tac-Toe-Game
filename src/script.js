const images = [
	'<svg xmlns="http://www.w3.org/2000/svg" width="90px" height="90px" class="ionicon cross" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" width="75px" height="75px" class="ionicon circle" viewBox="0 0 512 512"><title>Ellipse</title><circle cx="256" cy="256" r="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',
]; // 0 - cross, 1 - circle

const winningCombinations = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];
let currentPlayer = 0; // 0 - cross, 1 - circle

let markedByPlayers = [[], []]; // 0 - cross, 1 - circle

let gameState = false; // true = win

let movesCount = 0;

function ifWin(player) {
	movesCount += 1;
	console.log(movesCount);

	winningCombinations.forEach((combination) => {
		if (combination.every((elem) => markedByPlayers[player].includes(elem))) {
			document
				.querySelectorAll(".field")
				.forEach((field) => (field.style.pointerEvents = "none"));

			document.querySelector("#game-content").style.animation =
				"game-content-fade-out 1500ms forwards";

			let color = "";
			player ? (color = "white") : (color = "#5c5e64");

			let winningIcon = "";
			player
				? (winningIcon = '<div class="circle-icon-winning"></div>')
				: (winningIcon = '<div class="cross-icon-winning"></div>');

			document.querySelector("#winning-game").style.color = color;
			document.querySelector("#winning-game-icon").innerHTML = winningIcon;
			document.querySelector("#winning-game").style.animation =
				"winning-game-fade-in 1500ms forwards";

			gameState = true;
		} else if (movesCount > 8) {
			document.querySelector("#game-content").style.animation =
				"game-content-fade-out 1500ms forwards";
			document.querySelector("#winning-game span").innerHTML = "Draw!";
			document.querySelector("#winning-game-icon").innerHTML =
				'<div class="circle-icon-winning"></div><div class="cross-icon-winning"></div>';
			document.querySelector("#winning-game").style.animation =
				"winning-game-fade-in 1500ms forwards";
		}
	});
}

function handleFieldClick(fieldId) {
	document.querySelector("#" + fieldId).innerHTML = images[currentPlayer];
	markedByPlayers[currentPlayer].push(parseInt(fieldId.substr(1)));

	ifWin(currentPlayer);

	if (!gameState) {
		document
			.querySelector("#m" + currentPlayer)
			.classList.remove("moves-player-active");
		currentPlayer ? (currentPlayer = 0) : (currentPlayer = 1);
		document
			.querySelector("#m" + currentPlayer)
			.classList.add("moves-player-active");

		document.querySelector("#" + fieldId).style.pointerEvents = "none";
	}
}

window.addEventListener("load", () => {
	document.querySelector("#m0").classList.add("moves-player-active");

	let fields = document.querySelectorAll(".field");
	fields.forEach((field) => {
		field.addEventListener("click", function () {
			handleFieldClick(this.id);
		});
	});
});
