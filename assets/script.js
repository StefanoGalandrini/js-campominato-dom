// declare global DOM variables
const playBtn = document.querySelector("#play");
const grid = document.querySelector(".grid");

// defines the approx centainer width and height in pixels
const baseContainerDim = 600;

// Variable for score keeping and mines numbers
let totalPoints = 0;
const minesArray = [];

// add event listener to play button
// all code will be inside that
playBtn.addEventListener("click", function () {
	grid.innerHTML = "";

	const difficultyLevel = document.querySelector("#difficulty").value;

	// build grid creating html elements
	gridDimension(difficultyLevel);
	let cellCount = totalCells;
	let cellRow = Math.sqrt(totalCells);
	const dimCell = cellDimension(cellRow);

	// generate Array with 16 random numbers for mines
	createMinesArray(1, totalCells, 16, minesArray);

	for (let i = 1; i <= cellCount; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.style.width = `${dimCell}px`;
		cell.style.height = `${dimCell}px`;
		cell.innerHTML = i;

		cell.addEventListener("click", function () {
			cell.classList.toggle("selected");
			console.log(`Hai cliccato sulla casella ${i}`);
		});

		grid.appendChild(cell);
	}
	/*	dimensioning container to an integer
		plus twice the border
		to prevent small empty spaces between cells and container
		with some widths and number of cells */
	dimContainer = dimCell * cellRow + 6;
	grid.style.opacity = 1;
	grid.style.maxWidth = `${dimContainer}px`;
	grid.style.maxHeight = `${dimContainer}px`;
});

function gridDimension(level) {
	// define grid dimension based on selection
	switch (level) {
		case "1":
			totalCells = 100;
			break;
		case "2":
			totalCells = 81;
			break;
		case "3":
			totalCells = 49;
			break;
		default:
			totalCells = 100;
	}
	return totalCells;
}

function cellDimension(dim) {
	//value rounded to integer to prevent
	// small empty spaces between cells and container
	const dimCell = Math.round((baseContainerDim - 2 * 3) / dim);
	return dimCell;
}

function createMinesArray(min, max, mines, minesArray) {
	let minesNum;
	const array = [];

	let i = 1;
	while (i <= mines) {
		minesNum = Math.floor(Math.random() * (max - min + 1)) + min;
		if (!array.includes(minesNum)) {
			array.push(minesNum);
			i++;
		}
		minesArray = array.sort((a, b) => a - b);
		console.log("i: " + i, minesArray);
	}
	return minesArray;
}
