# WebWalc

## Introduction
I've built WebWalc to determine the performance of a web-based programming system written in WebAssembly.

Specifically, while WebWalc's editor is written in TypeScript, the underlying program model and interpreter are written in Rust WebAssembly.
The key question WebWalc seeks to answer is whether the costs of transferring program data to WebAssembly's linear memory outweigh the benefits of moving program interpretation out of JavaScript.
Another question WebWalc targets is language portability. I intend to evaluate WebWalc with frontends written in different languages, 
to determine whether a single interpreter is viable to support a language across diverse platforms and editing environments.

## Status: Early
Currently, WebWalc is a very minimal calculator which could be done with a stack. Yikes! However, there are a couple of operations that I anticipate could greatly benefit a Rust implementation.
In particular, extensive looping and repeated data access will add locality pressure which I suspect Rust may be better able to handle.
Keep an eye out!

Of note: frontends have already been written for walc in a web (webwalc.ts) and terminal based (walc-frontend) environment.

## Associated Repositories:
- walc-model: interpreter backend written in Rust. https://github.com/Willmo3/walc-model
- WebWalc.ts: web-based interpreter frontend written in TypeScript. https://github.com/Willmo3/webwalc.ts
- walc-frontend: cli-based interpreter frontend written in Rust. https://github.com/Willmo3/walc-frontend
