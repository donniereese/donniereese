
class WebTerm {
    constructor() {
        this._version = '0.0.2a';
        // Set variables
        this.visible = false;
        // elements
        this.button = null;
        this.termWindow = null;
        this.input = null;
        this.buffer = null;
        this.currentInput = '';

        this.history = [];
        this.historyPointer = -1;

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
        // return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
        //     replace(/\x08/g, '\\x08');
        return s;
    };

    printHelp() {
        this.writeToBuffer([
            '',
            'exit',
            '{t}Exits Terminal view and returns to the page',
            'scroll [ [-]INT ]',
            '{t}Scrolls the screen by a default of 100px.',
            '{t}OPT: {+/-NUM} Scroll distance',
            '',
            'help',
            '{t}Shows this help menu',
            'version',
            '{t}Current version of terminal'
        ]);
    }

    writeToBuffer(argArr = '') {
        if (!Array.isArray(argArr)) argArr = new Array(argArr);
        argArr.forEach((m) => {
            m = m.replace('{t}', ' -- ');
            const newNode = document.createElement('li');
            const newTextNode = document.createTextNode(m);
            newNode.appendChild(newTextNode);
            this.log.appendChild(newNode);
        });
    }

    pushToHistory() {
        this.history.push(`${m}`);
    }

    createNewButton() {
        const termButton = document.createElement('div');
        const buttonText = document.createTextNode('>');
        termButton.appendChild(buttonText);
    }

    command(e) {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
            if (this.history.length > 0 && this.historyPointer >= 0) {
                this.input.value = this.history[this.historyPointer];
                this.historyPointer = this.historyPointer > 0 ? this.historyPointer - 1 : 0;
            }
        } else if (e.key === 'ArrowDown') {
            if (this.historyPointer >= 0 && this.historyPointer < (this.history.length - 1)) {
                this.historyPointer++;
                this.input.value = this.history[this.historyPointer];
            } if (this.historyPointer === this.history.length - 1) {
                this.input.value = '';
            }
        } else if (e.key === 'Enter') {
            this.currentInput = this.regExpEscape(this.input.value);
            const cmdArr = this.currentInput.split(' ');
            let found = true;
            switch(cmdArr[0]) {
                case 'close':
                case 'quit':
                case 'exit':
                    this.deactivateTerminal();
                    break;
                case 'reload':
                case 'refresh':
                    window.location.reload();
                    break;
                case 'scroll':
                    const dist = parseInt(cmdArr[1]) || 100;
                    window.scrollBy(0,dist);
                    break;
                case 'help':
                    this.printHelp();
                    break;
                case 'version':
                    this.writeToBuffer(this._version);
                    break;
                case 'ssh':
                case 'telnet':
                case 'ping':
                case 'traceroute':
                case 'mkdir':
                case 'ls':
                    this.writeToBuffer("You've got the wrong idea about me. I'm not that sort of software.");
                default:
                    found = false;
            }

            if (!found) {
                const logItem =document.createElement('li');
                const text = `'${this.currentInput}' is not a valid command.`;
                const logText = document.createTextNode(text);
                logItem.appendChild(logText);
                this.log.appendChild(logItem);
            } else {
                const logItem =document.createElement('li');
                const logText = document.createTextNode(`${this.currentInput}`);
                logItem.appendChild(logText);
                this.log.appendChild(logItem);
            }
            this.history.push(this.currentInput);
            this.historyPointer = this.history.length - 1;
            this.input.value = '';
            this.termWindow.scrollTop = this.termWindow.scrollHeight;
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

        this.visible = true;
    }

    deactivateTerminal() {
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
