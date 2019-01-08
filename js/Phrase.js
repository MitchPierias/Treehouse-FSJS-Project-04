/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Add Phrase
     * @desc Adds the phrase to the gameboard
     */
    addPhraseToDisplay(elem) {
        // Clear existing
        elem.innerHTML = "";
        // Build and display character elements
        this.phrase.split('').forEach(char => {
            const letter = document.createElement('li');
            letter.innerHTML = char;
            letter.className = (/\s/gi.test(char)) ? 'space' : `hide letter ${char}`;
            elem.appendChild(letter);
        });
    }

    /**
     * Check Letter
     * @desc Checks if a letter is in the phrase
     */
    checkLetter(letter) {
        const pattern = new RegExp(`${letter.toLowerCase()}`, 'gi');
        return pattern.test(this.phrase);
    }

    /**
     * Reveal Letter
     * @desc Reveals the letters on the board which match the player's selection
     */
    showMatchedLetter(char) {
        const letters = document.getElementsByClassName(`letter ${char}`);
        Array.from(letters).forEach(elem => elem.className = `show letter ${char}`);
    }
}