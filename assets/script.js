// declare global DOM variables
const playBtn = document.querySelector("#play");
const grid = document.querySelector(".grid");

// defines the approx centainer width and height in pixels
const baseContainerDim = 600;

// Variable for score keeping and mines numbers
let totalPoints = 0;
let totalCells = 0;

// add event listener to play button
// all code will be inside that
playBtn.addEventListener("click", function () {
	grid.innerHTML = "";
	const minesArray = [];

	const difficultyLevel = document.querySelector("#difficulty").value;

	// build grid creating html elements
	gridDimension(difficultyLevel);
	let cellCount = totalCells;
	let cellRow = Math.sqrt(totalCells);
	const dimCell = cellDimension(cellRow);

	// generate Array with 16 random numbers for mines
	createMinesArray(1, totalCells, 16, minesArray);

	const cellArray = [];
	for (let i = 0; i < cellCount; i++) {
		cellArray[i] = document.createElement("div");
		cellArray[i].classList.add("cell");
		cellArray[i].style.width = `${dimCell}px`;
		cellArray[i].style.height = `${dimCell}px`;
		cellArray[i].innerHTML = i;

		cellArray[i].addEventListener("click", function () {
			console.log(`Hai cliccato sulla casella ${i}`);

			if (minesArray.includes(i)) {
				for (let i = 0; i < minesArray.length; i++) {
					cellArray[minesArray[i]].classList.add("mine");
				}
			} else {
				cellArray[i].classList.toggle("selected");
				totalPoints++;
			}
		});

		grid.appendChild(cellArray[i]);
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
