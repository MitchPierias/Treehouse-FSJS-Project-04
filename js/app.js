/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const PHRASES = [
    "Too many cooks spoil the broth",
    "Fuzzy wuzzy",
    "A blessing in disguise",
    "Better late than never"
]

const game = new Game(PHRASES);

document.getElementById('btn__reset').addEventListener('click', event => {
    // Start a new game
    game.startGame();
});
// Handle button element clicks
document.getElementById('qwerty').addEventListener('click', ({ target }) => {
    // Limit click target to button and handle button interactions
    if (target.tagName != 'BUTTON' && target.className !== 'key') return;
    game.handleInteraction(target);
});
// Handle keyboard input
document.addEventListener("keydown", ({ key }) => {
    // Skip non single characters
    if (!/^[a-z]{1}$/gi.test(key)) return;
    console.log(key);
}, false);

// App styles have been personalized and changes have been noted in the README.md file and the project submission notes