// Listeners for

import { lex } from '../lib/webwalc.ts/lexer.js';
import { parse } from '../lib/webwalc.ts/parser.js';
import { WebwalcJsonVisitor } from '../lib/webwalc.ts/webwalcJsonVisitor.js';
import { postTraverseAST } from '../lib/webwalc.ts/ast.js';
import init, { calc } from '../pkg/webwalc.js';

// Ensure WebAssembly initialization complete before continuing.
await init();
const editor = ace.edit('editor');

document.getElementById('submitButton').addEventListener('click', () => {
    // Assuming 'editor' is your instance of Ace editor
    const input = editor.getValue();

    const tree = parse(lex(input));
    const visitor = new WebwalcJsonVisitor();
    postTraverseAST(tree, visitor);
    document.getElementById('outputBox').innerText = calc(visitor.result());
});