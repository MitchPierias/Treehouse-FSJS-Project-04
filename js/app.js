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
document.getElementById('qwerty').addEventListener('click', game.handleInteraction);
// Handle keyboard input
document.addEventListener("keydown", game.handleInteraction, false);