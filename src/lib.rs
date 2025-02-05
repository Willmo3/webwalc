mod utils;

use walc_model::interpret;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
/// Given a tree in JSON format, evaluate it and return a string representation of the result.
/// First character will be E or O, representing Error or OK.
pub fn execute(source: &str) -> String {
    match interpret(source) {
        Ok(result) => format!("O{}", result),
        Err(message) => format!("E{}", message)
    }
}
