import init, { execute } from '../pkg/webwalc.js';

// Ensure WebAssembly initialization complete before continuing.
await init();

// Initialize Ace Editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

// Additional options
editor.setOptions({
    fontSize: "14px",
    showPrintMargin: true,
    wrap: true,
});

document.getElementById('submitButton').addEventListener('click', () => {
    const output = execute(editor.getValue());
    // Returning result across WebAssembly, so indicating error or OK by first character.
    if (output[0] === "E") {
        document.getElementById('outputBox').style.color = 'red';
        document.getElementById('outputBox').innerText = output.slice(1);
    } else if (output[0] === "O") {
        document.getElementById('outputBox').style.color = 'black';
        document.getElementById('outputBox').innerText = output.slice(1);
    } else {
        document.getElementById('outputBox').style.color = 'red';
        document.getElementById('outputBox').innerText = 'API Error.'
    }
});