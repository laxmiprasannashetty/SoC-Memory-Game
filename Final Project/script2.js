const emojis = ['😀', '😎', '🌟', '🎉', '🍕', '🎈', '🍦', '🌈'];

// Variables
let moves = 0;
let matchedPairs = 0;
let firstCard = null;
let secondCard = null;
let timerInterval = null;
let seconds = 0;

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// Function for game board
function createGameBoard(size) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    const emojisCopy = [...emojis, ...emojis]; // Double the emojis for pairs
    shuffleArray(emojisCopy);

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile', 'hidden');
        tile.dataset.emoji = emojisCopy[i];
        tile.addEventListener('click', handleCardClick);
        gameBoard.appendChild(tile);
    }
}

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to handle card click
function handleCardClick() {
    if (this === firstCard || this.classList.contains('matched')) {
        return;
    }

    this.classList.remove('hidden');
    this.innerHTML = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        document.getElementById('moveCount').innerText = moves;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            firstCard = null;
            secondCard = null;
        } else {
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                firstCard.innerHTML = '';
                secondCard.innerHTML = '';
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }

    if (matchedPairs === emojis.length) {
        clearInterval(timerInterval);
        alert(`Congratulations! You completed the game in ${moves} moves and ${document.getElementById('timer').innerText} minutes.`);
    }
}

// Event listeners for buttons
document.getElementById('startButton').addEventListener('click', () => {
    moves = 0;
    matchedPairs = 0;
    seconds = 0;
    clearInterval(timerInterval);
    document.getElementById('moveCount').innerText = moves;
    document.getElementById('timer').innerText = '00:00';
    createGameBoard(4); // Adjust grid size here (e.g., 4x4)
    startTimer();
});

document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(timerInterval);
    window.location.href = 'index.html'; // Replace with your home page URL
});

// Initial setup
createGameBoard(4); // Default grid size on initial load
