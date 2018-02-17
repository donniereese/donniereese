
class WebTerm {
    constructor() {
        // Set variables
        this.visible = false;
        // elements
        this.button = null;
        this.termWindow = null;

        // Find button instances by class
        const buttonMatches = document.getElementsByClassName('termButton');
        // return null if none
        if (buttonMatches.length === 0) return null;
        // set the first button
        this.button = buttonMatches.item(0);
        // add the event listener on the button
        this.button.addEventListener('click', this.toggleTerminal.bind(this));
    }

    createNewButton() {
        const termButton = document.createElement('div');
        const buttonText = document.createTextNode('>');
        termButton.appendChild(buttonText);
    }

    activateTerminal() {
        // toggle the activated class name on the button
        // create the terminal window
        this.termWindow = document.createElement('div');
        // create the input prompt
        const inputPrompt = document.createElement('input');
        // create the console log
        const termLog = document.createElement('ul');
        // append them to the window element
        this.termWindow.appendChild(termLog);
        this.termWindow.appendChild(inputPrompt);
        // Give termWindow it's class
        this.termWindow.classList.add('termWindow');
        // toggle the sticky class on the button
        this.button.classList.toggle('termButton--sticky');
        // add it to the document
        document.body.appendChild(this.termWindow);
        this.termWindow.appendChild(this.button);
        console.log('activate');

        this.visible = true;
    }

    deactivateTerminal() {
        console.log('deactivate');
        document.body.appendChild(this.button);
        document.body.removeChild(this.termWindow);
        this.button.classList.toggle('termButton--sticky');
        this.visible = false;
    }

    toggleTerminal(e) {
        e.preventDefault();
        // if terminal flag is already active, run deactivate
        // else, activate
        if (this.visible) {
            this.deactivateTerminal();
        } else {
            this.activateTerminal();
        }
    }
}

term = new WebTerm();
