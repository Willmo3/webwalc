import { lex } from '../lib/webwalc.ts/lexer.js';
import { parse } from '../lib/webwalc.ts/parser.js';
import { WebwalcJsonVisitor } from '../lib/webwalc.ts/webwalcJsonVisitor.js';
import { postTraverseAST } from '../lib/webwalc.ts/ast.js';
import init, { calc } from '../pkg/webwalc.js';

init().then(() => {
    const tree = parse(lex("3 + 3"));
    const visitor = new WebwalcJsonVisitor();
    postTraverseAST(tree, visitor);
    console.log(calc(visitor.result()));
});