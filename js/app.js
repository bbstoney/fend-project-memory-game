/*
 * Create a list that holds all of your cards
 */
// Create listOfCards from DOM elements
let listOfCards = document.querySelectorAll('.card');

// Transform listOfCards to arrayOfCards
let arrayOfCards = [];
listOfCards.forEach(function(arrayItem) {
	arrayOfCards.push(arrayItem);
});

// Moves counter variable
let moves = 0;

// Timer Counter
let timer = 0;
let liveTimerVar = setInterval(liveTimer,1000);

// Grabbing winning msg container
let div = document.querySelector('#congrats');

// Grabbing new game btn
let newGameBtn = document.querySelector('.new-game > button');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create HTML for shuffled cards
function createDeck(){
	let shuffledArrayOfCards = shuffle(arrayOfCards);
	let deck = document.querySelector('.deck');
	shuffledArrayOfCards.forEach(function(arrayItem){
		deck.appendChild(arrayItem);
	});
}

// Loading page with shuffled deck
window.onload = function(){
	createDeck();
	resetMoves();
	resetStars();
}

// Reset Moves counter
function resetMoves(){
	let movesCounter = document.querySelector('.moves');
	moves = 0;
	movesCounter.innerHTML = moves;
}

// Reset stars counter
function resetStars(){
	let starsParent = document.querySelector('.stars');
	const htmlToAdd = '<li><i class="fa fa-star"></i></li>';
	while(starsParent.firstChild){
		starsParent.removeChild(starsParent.firstChild);
	}
	for(let i=1; i<=3; i++){
		starsParent.insertAdjacentHTML('afterbegin', htmlToAdd);
	}
	
}

// Reset card classes
function resetClass(){
	let deck = document.querySelector('.deck');
	let cards = document.querySelectorAll('.card');
	cards.forEach(function(listItem){
		let classList = listItem.classList;
		classList.remove('open', 'match', 'show', 'hide', 'mismatch', 'animate', 'bounce', 'rubberBand');
	});
}

// Add click event to restart button
let restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click',function(event){
	resetClass();
	createDeck();
	resetMoves();
	resetStars();
	timer = 0;
},true);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let deck = document.querySelector('.deck');
let flippedCardChildClassName = [];
let numberOfFlippedCards = 2;
let clickedElementClasses = [];
let movesCounter = document.querySelector('.moves');

deck.addEventListener('click',function(event){
	let listOfCards = document.querySelectorAll('.card');
	let clickedCard = event.target;
	let clickedCardChildClassName = clickedCard.firstElementChild.classList[1];
	
	if(numberOfFlippedCards > 1){
		
		clickedCard.classList.add('open','show');
		flippedCardChildClassName.push(clickedCardChildClassName);
		clickedElementClasses.push(clickedCard);
		numberOfFlippedCards--;
		
	} else {
		
		flippedCardChildClassName.push(clickedCardChildClassName);
		clickedElementClasses.push(clickedCard);
		clickedCard.classList.add('open','show');
		movesCounter.innerHTML = ++moves;
		numberOfFlippedCards = 2;
		if(flippedCardChildClassName[0] === flippedCardChildClassName[1]){
			clickedElementClasses.forEach(function(element){
				element.classList.remove('mismatch');
				element.classList.add('match', 'animated', 'rubberBand');
			});
			flippedCardChildClassName = [];
			clickedElementClasses = [];
			displayWinningMsg();
		} else if(flippedCardChildClassName[0] !== flippedCardChildClassName[1]){
			clickedElementClasses.forEach(function(element){
				element.classList.add('mismatch', 'animated', 'bounce');
				element.classList.remove('match');
			});
			flippedCardChildClassName = [];
			clickedElementClasses = [];
		}
	}
	// Unflipp mismatching cards
	let mismatchCards = document.querySelectorAll('.mismatch');
	if(mismatchCards.length === 2){
		setTimeout(function(){
				mismatchCards.forEach(function(item){
				item.classList.remove('mismatch', 'open', 'show');
				item.classList.remove('animated', 'bounce');
			});
		}, 1000);
	}
	
	// Decreasing Stars based on moves count
	if(moves === 12){
		let starsParent = document.querySelector('.stars');
		let msgStarsParent = document.querySelector('.stars-drawing > ul');
		let htmlToAdd = '<li><i class="fa fa-star"></i></li>';
		while(starsParent.lastChild){
			starsParent.removeChild(starsParent.lastChild);
			msgStarsParent.removeChild(msgStarsParent.lastChild);
		}
		while(msgStarsParent.lastChild){
			msgStarsParent.removeChild(msgStarsParent.lastChild);
		}
		for(let i=1; i<=2; i++){
			starsParent.insertAdjacentHTML('afterbegin', htmlToAdd);
			msgStarsParent.insertAdjacentHTML('afterbegin', htmlToAdd);
		}
	} else if(moves === 20){
		let starsParent = document.querySelector('.stars');
		let msgStarsParent = document.querySelector('.stars-drawing > ul');
		let htmlToAdd = '<li><i class="fa fa-star"></i></li>';
		while(starsParent.lastChild){
			starsParent.removeChild(starsParent.lastChild);
			msgStarsParent.removeChild(msgStarsParent.lastChild);
		}
		while(msgStarsParent.lastChild){
			msgStarsParent.removeChild(msgStarsParent.lastChild);
		}
		for(let i=1; i<=1; i++){
			starsParent.insertAdjacentHTML('afterbegin', htmlToAdd);
			msgStarsParent.insertAdjacentHTML('afterbegin', htmlToAdd);
		}
	}
	
},true);

// Add live timer to the game
let timerHtml = document.querySelector('span.timer');
function liveTimer(){
	return timerHtml.innerHTML = ++timer;
}


// Display winning msg on winning game
function displayWinningMsg(){
	let cardClassesList = document.querySelectorAll('.match');
	if(cardClassesList.length === 16) {
		div.classList.remove('hide-msg', 'bounceOutUp');
		div.classList.add('bounceInDown');
		let msgMoves = document.querySelector('.moves-n0-txt > p > span');
		msgMoves.innerHTML = moves;
		let msgTimer = document.querySelector('.timer-txt > p > span');
		msgTimer.innerHTML = timer;
		clearInterval(liveTimerVar);
		startNewGameBtn();
	}
}

// Start a new game after pressing new game btn
function startNewGameBtn(){
	newGameBtn.addEventListener('click', function(event){
		div.classList.remove('bounceInDown');
		div.classList.add('bounceOutUp');
		resetClass();
		createDeck();
		resetMoves();
		resetStars();
		timer = 0;
		liveTimerVar = setInterval(liveTimer,1000);
	}, true);
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	