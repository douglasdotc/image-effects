use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;
use base64::{ encode, decode };
use image::load_from_memory;
use image::ImageOutputFormat::Png;


// String: we have ownership of the string
// str: we are borrowing a string
#[wasm_bindgen] // <-- export function to javascript, pub just make fn public in rust
pub fn grayscale(encoded_file: &str) -> String {
    log(&"Grayscale called".into());

    // Decode to binary:
    let base64_to_vector = decode(encoded_file).unwrap();
    log(&"Image decoded".into());

    // load_from_memory() store a copy of the image for manipulation:
    let mut img = load_from_memory(&base64_to_vector).unwrap();
    log(&"Image loaded".into());

    // Convert the image to grayscale:
    img = img.grayscale();
    log(&"Grayscale effect applied".into());

    // Create a buffer for an image, 
    // buffers are a feature for temporarily storing data,
    // After data is stored in the buffer, we can read the data
    // from the buffer. This means we can read the data without
    // completely downloaded the data:
    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();
    log(&"New image written".into());

    // Encode the binary image back to base64:
    let encoded_img = encode(&buffer);

    // Add metadata back to the string:
    let data_url = format!(
        "data:image/png;base64,{}",
        encoded_img
    );
    return data_url
}
