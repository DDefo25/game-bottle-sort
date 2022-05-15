const RED = '#FA3C4C';
const GREEN = '#64FA87';
const BLUE = '#3953FA';
const PURPLE = '#992AFA';
const YELLOW = '#FAF246';
const ORANGE = '#FAA646';
const LIGTHBLUE = '#6BECF2';
const PINK = '#F528E7';

const colorsAll = [RED, GREEN, BLUE, PURPLE, YELLOW, ORANGE, LIGTHBLUE, PINK]

let colors = [];
let board = [];
let colorsInGame = 5;

const bottlesEmpty = 2;
const bottles = colorsInGame + bottlesEmpty;
const maxBallsInBottle = 4;
const balls = (bottles - bottlesEmpty) * maxBallsInBottle;

const buffer = {color: '', bottleIndex: 0};


function startGame() {
	clearStartConditions();
	colorChoosing(colorsAll);
	createRandom(board);
	renderBoard(board);
}

function random(min, max) {
	return Math.round(min + Math.random() * (max - min));
};

function randomIndex(array) {
	return Math.round(Math.random() * (array.length - 1));
};

function clearStartConditions() {
	board = [];
	clean(buffer);
	colors = [];
};

function colorChoosing(colorsAll) {
	let color;
	for (let i = 0; i < colorsInGame; i += 1) {
		color = colorsAll[randomIndex(colorsAll)];
		console.log(color);
		console.log(colors);
		while (colors.includes(color)) {
			color = colorsAll[randomIndex(colorsAll)];
		};
		console.log(color);
		colors.push(color);
	};
};

function createRandom(board) {
	for (i = 0; i < bottles; i += 1) {
		board[i] = new Array();
		let minColors = new Array();
		let isColor;

		function minColorArray(minColorNumber, colorsQuantity) {
			minColors = [];
			for (let [n, num] of colorsQuantity.entries()) {
				if (num === minColorNumber) minColors.push(colors[n]);
			};
		};
		
		for (let j = 0; j < maxBallsInBottle; j += 1) {
			if (i < 1) {
				isColor = colors[randomIndex(colors)];
				while (board[i].includes(isColor)) {
					isColor = colors[randomIndex(colors)];
				};
				board[i].push(isColor);
			} else if (i >= 1 && i < (bottles - bottlesEmpty)) {
				let colorsQuantity = colors.map(color => board.flat().filter(ball => ball === color).length);
				let minColorNumber = Math.min(...colorsQuantity);
				minColorArray(minColorNumber, colorsQuantity);
				
				let minColorIncludesInBottle = minColors.every(color => board[i].includes(color));
				while (minColorIncludesInBottle) {
					minColorArray(minColorNumber++, colorsQuantity);
				};
				
				isColor = minColors[randomIndex(minColors)];
				while (board[i].includes(isColor)) {
					isColor = minColors[randomIndex(minColors)];
				};			
				board[i].push(isColor)
			};
		};
	};
};

function isWin(board) {
	let isWin = true;
	for (bottle of board) {
		isWin *= isWinBottle(bottle);
	};
	return isWin;
};

function isWinBottle(bottle) {
	for (let color of colors) {
		if (bottle.length === 0) return true;
		else if (bottle.filter(ball => ball === color).length === maxBallsInBottle) return true;
	};
	return false;
};

function copyToBuffer(bottle, bottleIndex) {
	buffer.color = bottle.at(-1);
	buffer.bottleIndex = bottleIndex;
};

function clean(buffer) {
	buffer.color = '';
	buffer.bottleIndex = 0;
};

function moveBall(bottle) {
	bottle.push(buffer.color);
	board[buffer.bottleIndex].pop();
	clean(buffer);
};

function click(bottleIndex) {
	let bottle = board[bottleIndex];
	let bottleFull = bottle.length === 4;
	let bottleEmpty = bottle.length === 0;
	let lastColorInBottle = bottle.at(-1);
	const bufferEmpty = buffer.color === '';

	if (!bufferEmpty) {
		if (!bottleFull && !bottleEmpty) {
			if (lastColorInBottle === buffer.color) {
				moveBall(bottle);
			} else {
				copyToBuffer(bottle, bottleIndex);
			};
		} else if (bottleFull) {
			copyToBuffer(bottle, bottleIndex);	
		} else if (bottleEmpty) {
			moveBall(bottle);			
		};
	} else if (bufferEmpty) {
		if (!bottleEmpty) {
			copyToBuffer(bottle, bottleIndex);				
		};
	};
};