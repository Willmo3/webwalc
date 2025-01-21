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
/// Given a tree in JSON format, evaluate it and alert the console.
pub fn calc(tree: &str) -> String {
    let val = serde_json::from_str::<Token>(tree).unwrap().evaluate();
    format!("{:?}", val)
}
