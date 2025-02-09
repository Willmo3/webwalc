import init, { execute } from '../pkg/webwalc.js';

// Ensure WebAssembly initialization complete before continuing.
await init();

/* EDITING ENVIRONMENT PREPARATION LOGIC */
const ace_editor = ace.edit("editor");

function prepareEditor() {
    ace_editor.setOptions({
        fontSize: 20,
        wrap: true,
        theme: "ace/theme/cobalt",
    });

    document.getElementById('submitButton').addEventListener('click', () => {
        const output = execute(ace_editor.getValue());
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
}


/* WINDOW RESIZING LOGIC */
const editor_div = document.getElementById("editor");
const result_div = document.getElementById("buttons");

// Update the width of the editor and output boxes, based on the new editor width.
function updateWidth(editorWidth) {
    editor_div.style['flex-basis'] = editorWidth + 'px';
    result_div.style['flex-basis'] = (window.innerWidth - editorWidth) + 'px';
}

function prepareResizer() {
    // As mouse drags, repeatedly update the editor's width to be equal to the mouse's X coordinate.
    const dragListener = event => {
        updateWidth(event.clientX);
        // Remove default Chrome behavior for element dragging.
        event.preventDefault();
    };

    // When mouse goes up, stop updating widths based on mouse position.
    const upListener = () => {
        document.removeEventListener('mousemove', dragListener);
        document.removeEventListener('mouseup', upListener);
    };

    // When mouse goes down, begin updating widths based on mouse position.
    const downListener = () => {
        document.addEventListener('mousemove', dragListener);
        document.addEventListener('mouseup', upListener);
    };

    // Set base width and height to 0.7, 0.3, and begin listening to keydrags.
    updateWidth(window.innerWidth * 0.5);
    document.getElementById('dragger').addEventListener('mousedown', downListener);
}


/* INITIALIZATION */
prepareEditor();
prepareResizer();