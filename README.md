# WebWalc

## Introduction
WebWalc is the website frontend for the Walc programming language. It uses the Ace editor and connects to the Walc
interpreter via WebAssembly, meaning that the entire runtime environment runs client-side.

### Motivation
WebWalc evaluates whether the costs of transferring program data to WebAssembly's linear memory outweigh the performance benefits. Another question WebWalc targets is language portability -- how well can a single interpreter effectively target diverse backgrounds?

## Requirements
- `rust`: WebWalc relies on Rust WebAssembly.
- `cargo`: Required dependencies are downloaded through Cargo. Unlike `npm`, Cargo is critical to the build process.
- `wasm-bindgen`: For generating js-WebAssembly bindings. 
- `tailwind.css`: Used to generate stylesheets. Can be downloaded through `package.json` in `npm`.
- `npm (optional)`: many packages are provided through `npm`, though most can be downloaded through other means.

## Status: Early
Currently, WebWalc is a very minimal calculator which could be done with a stack. Yikes! However, there are a couple of operations that I anticipate could greatly benefit a Rust implementation.
In particular, extensive looping and repeated data access will add locality pressure which I suspect Rust may be better able to handle.

Of note: because the Walc interpreter is published through Rust WebAssembly, a cli-frontend has also been constructed -- see walc-frontend!

## Associated Repositories:
- walc-model: interpreter backend written in Rust. https://github.com/Willmo3/walc-model
- walc-frontend: cli-based interpreter frontend written in Rust. https://github.com/Willmo3/walc-frontend
