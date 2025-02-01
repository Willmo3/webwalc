mod utils;

use walc_model::ast::token::Token;
use walc_model::ast::treewalk_interpreter::interpret;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, #{name}!"));
}

#[wasm_bindgen]
/// Given a tree in JSON format, evaluate it and return a string representation of the result.
/// First character will be E or O, representing Error or OK.
pub fn calc(tree: &str) -> String {
    let translation = serde_json::from_str::<Token>(tree);
    let ast = match translation {
        Ok(ast) => ast,
        Err(message) => return format!("E{:?}", message.to_string()),
    };
    match interpret(&ast) {
        Ok(result) => format!("O{:?}", result),
        Err(message) => format!("E{:?}", message),
    }
}
