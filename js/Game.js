/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    constructor(phrases=[]) {
        this.missed = 0;
        this.phrases = phrases;
        this.activePhrase = null;
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    /**
     * Start game
     * @desc Hides the start screen overlay,
     * sets the activePhrase property to a random phrase,
     * and calls the addPhraseToDisplay() method on the active phrase
     */
    startGame() {
        this.missed = 0;
        const overlayElem = document.getElementById('overlay');
        overlayElem.style.visibility = 'hidden';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }
    
    /**
     * Get Random Phrase
     * @desc Retrieves a random phrase from the phrases array
     * @returns {Phrase} Initialized Phrase object
     */
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * (this.phrases.length-1));
        return new Phrase(this.phrases[randomIndex]);
    }

    /**
     * Handle Interaction
     * @desc Handles user interaction with a 'key' element
     * @param {HTMLEvent} event - The `click` or `keyup` event object
     */
    handleInteraction(event) {
        let elem = null;
        if (event.type === 'keydown') {
            // Escape if game is not active
            if (document.getElementById('overlay').style.visibility === 'visible') return;
            // Skip non single characters
            if (!/^[a-z]{1}$/gi.test(event.key)) return;
            // Find keyboard element
            elem = Array.from(document.getElementsByClassName('key')).filter(button => button.innerText == event.key)[0];
        } else {
            elem = event.target;
        }
        // Limit click target to button and handle button interactions
        if (elem.tagName !== 'BUTTON' && elem.className !== 'key') return;
        // Select the element
        this.selectElement(elem);
    }

    /**
     * Select Element
     * @desc Handles user interaction with a 'key' element
     * @param {Object|String} selectedElem - The selected element or key
     */
    selectElement(elem) {
        // Disable the selected letter's onscreen keyboard button
        elem.disabled = true;
        // If the phrase does not include the guessed letter
        if (this.activePhrase.checkLetter(elem.innerText)) {
            // Mark selected element as chosen
            elem.className += ' chosen';
            // Reveal matched gameboard letter
            this.activePhrase.showMatchedLetter(elem.innerText);
            // Check game status
            if (this.checkForWin()) {
                // Player has won the game
                this.gameOver(true);
            }
        } else {
            // Mark selected element wrong
            elem.className += ' wrong';
            // Remove a life
            this.removeLife();
        }
    }

    /**
     * Check Win
     * @desc Checks if the player has revealed all of the letters in the active phrase
     * @returns {Boolean} Has won determiner
     */
    checkForWin() {
        // Compare the revealed element count against the phrase letter count
        const revealedLetters = document.getElementsByClassName('show letter');
        const phraseLetters = this.activePhrase.phrase.replace(/\s/gi,'');
        return phraseLetters.length === revealedLetters.length;
    }

    /**
     * Remove Life
     * @desc Removes a life from the scoreboard
     */
    removeLife() {
        // Replace heart image
        const totalNumbers = document.getElementsByClassName('tries').length;
        const allImages = document.querySelectorAll('img[src="images/liveHeart.png"]');
        const image = allImages[allImages.length-1];
        image.setAttribute('src', 'images/lostHeart.png');
        // Increments the missed property
        this.missed++;
        if (this.missed >= totalNumbers) {
            this.gameOver(false);
        }
    }

    /**
     * Game Over
     * @desc Displays the players game outcome and resets game elements
     * @param {Boolean} didWin - (optional) Optional game outcome determiner
     */
    gameOver(didWin=false) {
        // Show the original start screen overlay styled with either the win or lose CSS class
        const overlay = document.getElementById('overlay');
        overlay.style.visibility = 'visible';
        overlay.className = (didWin) ? 'win' : 'lose';
        const gameMessage = document.getElementById('game-over-message');
        gameMessage.innerText = (didWin) ? 'Congratulations! You\'ve won...' : 'Sorry, you\'re out of lives...'
        // Reset button elements
        Array.from(document.getElementsByClassName('key')).forEach(elem => {
            elem.className = 'key';
            elem.disabled = false;
        });
        // Reset lives
        Array.from(document.querySelectorAll('img[src="images/lostHeart.png"]')).forEach(elem => elem.setAttribute('src','images/liveHeart.png'));
        // Reset phrase dispaly
        this.activePhrase.removePhraseFromDisplay();
    }
}