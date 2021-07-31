const results = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let player = 1;
let shape = 'o';
let winner = null;
let counter = 0;

const title = document.querySelector('.title');
const game = document.querySelector('.game');
const playerDisplay = document.querySelector('.player');
const fields = document.querySelectorAll('.field');
const newGameBtn = document.querySelector('.new-game');

fields.forEach(field => {
    field.addEventListener('click', (e) => {
        if (winner === null) {
            if (!e.target.classList.contains('active') && !(e.target.tagName.toLowerCase() === 'img')) {
                e.target.querySelector('img').setAttribute('src', `img/${shape}.png`);
                e.target.querySelector('img').setAttribute('shape', `${shape}`);
                playerWins();
                changePlayer();
            }
            e.target.classList.add('active');
            e.target.removeAttribute('onclick');
            counter++;
            if (counter > 8)
                playerDisplay.innerText = 'tied';
        }
    });
});

newGameBtn.addEventListener('click', () => {
    fields.forEach(field => {
        field.classList.remove('active');
        field.querySelector('img').setAttribute('src', '');
        field.querySelector('img').setAttribute('shape', '');
        player = 1;
        shape = 'o';
        winner = null;
        counter = 0;
    });

    title.innerText = 'Tic Tac Toe';
    playerDisplay.innerText = 'Player 1';
    playerDisplay.style.opacity = 1;
    fields.forEach(i => i.classList.remove('winners-field'));
});

const playerWins = () => {
    const fieldsImages = document.querySelectorAll('.field > img');

    results.forEach(result => {
        if (fieldsImages[result[0]].getAttribute('shape') === `${shape}` &&
            fieldsImages[result[1]].getAttribute('shape') === `${shape}` &&
            fieldsImages[result[2]].getAttribute('shape') === `${shape}`) {
            if (shape === 'o') {
                title.innerText = 'Player 1 Wins!';
                winner = 1;
                document.querySelector(`.field--${result[0] + 1}`).classList.add('winners-field');
                document.querySelector(`.field--${result[1] + 1}`).classList.add('winners-field');
                document.querySelector(`.field--${result[2] + 1}`).classList.add('winners-field');
            }
            else if (shape === 'x') {
                title.innerText = 'Player 2 Wins!';
                winner = 2;
            }

            fields.forEach(i => i.classList.add('active'));
        }
    });
}

const changePlayer = () => {
    if (shape === 'o')
        shape = 'x';
    else if (shape === 'x')
        shape = 'o';

    if (player === 1)
        player = 2;
    else if (player === 2)
        player = 1;

    playerDisplay.innerText = `Player ${player}`;
    if (winner)
        playerDisplay.style.opacity = 0;
}
