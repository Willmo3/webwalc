// Initialization for WebWalc environment. Specifically: set options for Ace Editor.
// Author: Will Morris

// Initialize Ace Editor on the webpage
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

// Additional options
editor.setOptions({
    fontSize: "14px",
    showPrintMargin: true,
    wrap: true,
});