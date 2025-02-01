import { lex } from '../lib/webwalc.ts/src/frontend/lexer.js';
import { parse } from '../lib/webwalc.ts/src/frontend/parser.js';
import { WebwalcJsonVisitor } from '../lib/webwalc.ts/src/ast/webwalcJsonVisitor.js';
import { postTraverseAST } from '../lib/webwalc.ts/src/ast/ast.js';
import init, { calc } from '../pkg/webwalc.js';

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
    const input = editor.getValue();

    // Error checking from frontend follows looser API.
    const lexemes = lex(input);
    if (lexemes.hasOwnProperty("errorMessage")) {
        document.getElementById('outputBox').style.color = 'red';
        document.getElementById('outputBox').innerText = lexemes.errorMessage;
        return;
    }

    const tree = parse(lexemes);
    if (tree.hasOwnProperty("errorMessage")) {
        document.getElementById('outputBox').style.color = 'red';
        document.getElementById('outputBox').innerText = tree.errorMessage;
        return;
    }

    const visitor = new WebwalcJsonVisitor();
    postTraverseAST(tree, visitor);

    const output = calc(visitor.result());
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