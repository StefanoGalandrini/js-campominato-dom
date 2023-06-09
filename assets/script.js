// declare global DOM variables
const playBtn = document.querySelector("#play");
const grid = document.querySelector(".grid");
const start = document.querySelector(".start");
const message = document.querySelector(".message");
let endGame;
let totalCells = 0;

// defines the approx centainer width and height in pixels
const baseContainerDim = 600;

// add event listener to play button
// all code will be inside that
playBtn.addEventListener("click", function () {
	// reset grid
	start.innerHTML = "";
	grid.innerHTML = "";
	message.innerHTML = "";
	grid.style.pointerEvents = "auto";

	// Variable for score keeping and mines numbers
	const minesArray = [];
	let totalPoints = 0;
	const difficultyLevel = document.querySelector("#difficulty").value;

	// build grid creating html elements
	totalCells = gridDimension(difficultyLevel);
	const cellRow = Math.sqrt(totalCells);
	const dimCell = cellDimension(cellRow);

	// generate Array with 16 random numbers for mines
	const sortedArray = createMinesArray(1, totalCells, 16, minesArray);
	const cellArray = [];
	endGame = false;

	for (let i = 0; i < totalCells; i++) {
		cellArray[i] = document.createElement("div");
		cellArray[i].classList.add("cell");
		cellArray[i].style.width = `${dimCell}px`;
		cellArray[i].style.height = `${dimCell}px`;
		cellArray[i].innerHTML = i + 1;

		cellArray[i].addEventListener("click", function () {
			checkBomb(i, minesArray, cellArray);
			if (!endGame) {
				// no points if the cell has already been clicked
				if (!cellArray[i].classList.contains("selected")) {
					totalPoints++;
				}
				cellArray[i].classList.add("selected");
			} else {
				message.style.visibility = 1;
				message.innerHTML = `HAI PERSO.<br> Punteggio: <strong>${totalPoints}</strong>`;
				grid.style.pointerEvents = "none";
			}
		});
		grid.appendChild(cellArray[i]);
	}
	/*	dimensioning container to an integer plus twice the border
	to prevent small empty spaces between cells and container
	with some widths and number of cells */
	dimContainer = dimCell * cellRow + 6;
	grid.style.opacity = 1;
	grid.style.maxWidth = `${dimContainer}px`;
	grid.style.maxHeight = `${dimContainer}px`;
});

// FUNCTIONS DEFINITION

function gridDimension(level) {
	// define grid dimension based on selection
	let total;
	switch (level) {
		case "1":
			total = 100;
			break;
		case "2":
			total = 81;
			break;
		case "3":
			total = 49;
			break;
		default:
			total = 100;
	}
	return total;
}

function cellDimension(dim) {
	//value rounded to integer to prevent
	// small empty spaces between cells and container
	const dimension = Math.round((baseContainerDim - 2 * 3) / dim);
	return dimension;
}

function createMinesArray(min, max, mines, minesArr) {
	let minesNum;
	let i = 1;
	while (i <= mines) {
		minesNum = Math.floor(Math.random() * (max - min + 1)) + min;
		if (!minesArr.includes(minesNum)) {
			minesArr.push(minesNum);
			i++;
		}
	}
	const sorted = minesArr.sort((a, b) => a - b);
	return sorted;
}

function checkBomb(index, minesArray, cellArray) {
	if (minesArray.includes(index + 1)) {
		for (let i = 0; i < minesArray.length; i++) {
			cellArray[minesArray[i] - 1].classList.add("mine");
		}
		endGame = true;
	} else {
		endGame = false;
	}
}
