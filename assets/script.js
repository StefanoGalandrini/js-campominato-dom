// declare global DOM variables
const playBtn = document.querySelector("#play");
const grid = document.querySelector(".grid");
const start = document.querySelector(".start");
let endGame = false;

// defines the approx centainer width and height in pixels
const baseContainerDim = 600;

// Variable for score keeping and mines numbers
let totalCells = 0;

// add event listener to play button
// all code will be inside that
playBtn.addEventListener("click", function () {
	start.innerHTML = "";
	grid.innerHTML = "";
	const minesArray = [];
	let totalPoints = 0;

	const difficultyLevel = document.querySelector("#difficulty").value;

	// build grid creating html elements
	gridDimension(difficultyLevel);
	let cellCount = totalCells;
	let cellRow = Math.sqrt(totalCells);
	const dimCell = cellDimension(cellRow);

	// generate Array with 16 random numbers for mines
	createMinesArray(1, totalCells, 16, minesArray);
	console.log(minesArray);

	const cellArray = [];
	for (let i = 0; i < cellCount; i++) {
		cellArray[i] = document.createElement("div");
		cellArray[i].classList.add("cell");
		cellArray[i].style.width = `${dimCell}px`;
		cellArray[i].style.height = `${dimCell}px`;
		cellArray[i].innerHTML = i + 1;

		cellArray[i].addEventListener("click", function () {
			console.log(`Hai cliccato sulla casella ${i + 1}`);
			checkBomb(i, minesArray, cellArray);
			totalPoints++;
			console.log(endGame, totalPoints);
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
	const sortedArray = minesArr.sort((a, b) => a - b);
	return sortedArray;
}

function checkBomb(index, minesArray, cellArray) {
	if (minesArray.includes(index + 1)) {
		for (let i = 0; i < minesArray.length; i++) {
			cellArray[minesArray[i] - 1].classList.add("mine");
		}
		endGame = true;
	} else {
		cellArray[index].classList.toggle("selected");
		endGame = false;
	}
}
