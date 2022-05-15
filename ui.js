window.addEventListener('load', startGame);

const boardEl = document.getElementById('board');
const modalEl = document.getElementById('modal');
const resetButtons = document.getElementsByClassName('__reset');

for (let btn of resetButtons) {
	btn.addEventListener('click', function() {
		if (!modalEl.classList.contains('hidden')) {
			modalEl.classList.add('hidden');
		};
		clearBoard();
		startGame();
	});	
};

function renderBoard(board) {
	for (let [i, bottle] of board.entries()) {
		const bottleEl = document.createElement('div');
		bottleEl.className = 'bottle';
		bottleEl.id = i;
	    boardEl.append(bottleEl);
		for (let color of bottle) {
			if (color !== '') {
		    	const ballEl = document.createElement('div')
		    	ballEl.className = 'ball';
		    	ballEl.style.backgroundColor = color;
		    	bottleEl.append(ballEl);				
			};
    	};
  	};
};

boardEl.addEventListener('click', function(event) {
	let targetClasses = event.target.classList;
	let targetId = event.target.id;
	let targetParentId = event.target.parentElement.id;
	
	if (targetClasses.contains('bottle')) {
		click(targetId);
		clearBoard();
		renderBoard(board);
	} else if (targetClasses.contains('ball')) {
		click(targetParentId);
		clearBoard();
		renderBoard(board);
	};

	if (buffer.color !== '') {
		let boardFocusedEl = document.getElementById(buffer.bottleIndex);
		boardFocusedEl.lastChild.classList.add('focus');	
	};

	if (isWin(board)) showWin();
});

function showWin() {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Вы победили! 🍾`;
  modalEl.classList.remove('hidden');
};


function clearBoard() {
  boardEl.innerHTML = '';
};


