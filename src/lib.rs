mod utils;

use walc_model::Token;
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
/// Given a tree in JSON format.
pub fn calc(tree: &str) {
    let ast: Token = serde_json::from_str(tree).unwrap();
    greet(&format!("{:?}", ast.evaluate()));
}
