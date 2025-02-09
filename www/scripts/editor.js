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
// Credit to Dr. Chris Johnson's Twoville for inspiration.

const editorDiv = document.getElementById("editor");
const resultDiv = document.getElementById("buttons");
const baseEditorWidth = window.innerWidth * 0.5;

// Update the width of the editor and output boxes, based on the new editor width.
function updateWidth(editorWidth) {
    editorDiv.style['flex-basis'] = editorWidth + 'px';
    resultDiv.style['flex-basis'] = (window.innerWidth - editorWidth) + 'px';
}

// Toggle whether the results panel is visible.
function toggleResults(previousEditorWidth) {
    if (resultDiv.style['flex-basis'] === '0px') {
        updateWidth(previousEditorWidth);
    } else {
        updateWidth(window.innerWidth);
    }
}

function prepareResizer() {
    let downMillis = 0; // Time since button pressed down -- used to distinguish click.
    let mouseDrift = [0, 0];
    let previousEditorWidth = baseEditorWidth;

    // As mouse drags, repeatedly update the editor's width to be equal to the mouse's X coordinate.
    const dragListener = event => {
        updateWidth(event.clientX);
        previousEditorWidth = event.clientX;

        mouseDrift[0] = Math.abs(mouseDrift[0] - event.clientX);
        mouseDrift[1] = Math.abs(mouseDrift[1] - event.clientY);

        // Remove default Chrome behavior for element dragging.
        event.preventDefault();
    };

    // When mouse goes up, stop updating widths based on mouse position.
    const upListener = event => {
        const currentMillis = performance.now();
        // If only a small click, toggle to flush position!
        if (mouseDrift[0] + mouseDrift[1] < 4 && currentMillis - downMillis < 500) {
            toggleResults(previousEditorWidth);
        }

        document.removeEventListener('mousemove', dragListener);
        document.removeEventListener('mouseup', upListener);
    };

    // When mouse goes down, begin updating widths based on mouse position.
    const downListener = event => {
        downMillis = performance.now();
        mouseDrift[0] = 0;
        mouseDrift[1] = 0;

        document.addEventListener('mousemove', dragListener);
        document.addEventListener('mouseup', upListener);
    };

    // Set base width and height to 0.7, 0.3, and begin listening to keydrags.
    updateWidth(baseEditorWidth);
    document.getElementById('dragger').addEventListener('mousedown', downListener);
}


/* INITIALIZATION */
prepareEditor();
prepareResizer();