
class WebTerm {
    constructor() {
        // Set variables
        this.visible = false;
        // elements
        this.button = null;
        this.termWindow = null;
        this.input = null;
        this.buffer = null;
        this.currentInput = '';

        this.history = [];

        // Find button instances by class
        const buttonMatches = document.getElementsByClassName('termButton');
        // return null if none
        if (buttonMatches.length === 0) return null;
        // set the first button
        this.button = buttonMatches.item(0);
        // add the event listener on the button
        this.button.addEventListener('click', this.toggleTerminal.bind(this));
    }

    /**
     * Escapes characters in the string that are not safe to use in a RegExp.
     * @param {*} s The string to escape. If not a string, it will be casted
     *      to one.
     * @return {string} A RegExp safe, escaped copy of {@code s}.
     * This is from Google library, so that's really cool.
     */
    regExpEscape(s) {
        return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
            replace(/\x08/g, '\\x08');
    };

    createNewButton() {
        const termButton = document.createElement('div');
        const buttonText = document.createTextNode('>');
        termButton.appendChild(buttonText);
    }

    command(e) {
        e.preventDefault();
        if (e.key === 'Enter') {
            this.currentInput = this.regExpEscape(this.input.value);
            const cmdArr = this.currentInput.split(' ');
            let found = true;
            switch(cmdArr[0]) {
                case 'quit':
                case 'exit':
                    this.deactivateTerminal();
                    break;
                case 'reload':
                case 'refresh':
                    window.location.reload();
                    break;
                default:
                    console.log('false!');
                    found = false;
            }

            if (!found) {
                const logItem =document.createElement('li');
                const logText = document.createTextNode(`'${this.currentInput}' is not a valid command.`);
                logItem.appendChild(logText);
                this.log.appendChild(logItem);
            }

            this.input.value = '';
        }
    }

    activateTerminal() {
        // toggle the activated class name on the button
        // create the terminal window
        this.termWindow = document.createElement('div');
        // create the input prompt
        this.input = document.createElement('input');
        // create the console log
        this.log = document.createElement('ul');
        // append them to the window element
        this.termWindow.appendChild(this.log);
        this.termWindow.appendChild(this.input);
        // Give termWindow it's class
        this.termWindow.classList.add('termWindow');
        // toggle the sticky class on the button
        this.button.classList.toggle('termButton--sticky');
        // add it to the document
        document.body.appendChild(this.termWindow);
        this.termWindow.appendChild(this.button);
        // Set input event
        this.input.addEventListener('keyup', this.command.bind(this));
        // set focus on input
        this.input.focus();
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
