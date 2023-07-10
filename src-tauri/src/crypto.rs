extern crate crypto;
use std::fs::File;
use std::io::{Write, Read};
use std::path::Path;
use std::str::from_utf8;
use std::{path, string};

use crypto::{aes, blockmodes};
use crypto::buffer::{ReadBuffer, WriteBuffer, BufferResult, RefReadBuffer, RefWriteBuffer};
use crypto::symmetriccipher::SymmetricCipherError;

// Use this key for encryption and decryption
#[tauri::command]
pub fn encrypt(password: &str) -> Result<Vec<u8>, SymmetricCipherError> {
    // If not key in file, generate a new key and save it
    if !std::path::Path::new("secret.key").exists() {
        let key = generate_key();
        if let Ok(_) = save_key(&key) {
            // Encrypt password
            return encrypt_password(&password, &key);
        } else {
            return Err(SymmetricCipherError::InvalidLength);
        }
    } else {
        // Read key from file
        let mut file = std::fs::File::open("secret.key").unwrap();
        let mut key = Vec::<u8>::new();
        file.read_to_end(&mut key).unwrap();

        // Encrypt password
        return encrypt_password(&password, &key);
    } 
}

#[tauri::command]
pub fn decrypt(encrypted_data: &str) -> Result<String, SymmetricCipherError> {
    // Read key from file
    

    let mut file = std::fs::File::open("secret.key").unwrap();
    let mut key = Vec::<u8>::new();
    file.read_to_end(&mut key).unwrap();

    // Decrypt password

    let decrypted_data = decrypt_password(&encrypted_data, &key);
    if let Ok(decrypted_data) = decrypted_data {
        return Ok(from_utf8(decrypted_data.as_slice()).unwrap().to_string());
    } else {
        return Err(SymmetricCipherError::InvalidLength);
    }
    
}

fn generate_key() -> Vec<u8> {
    let mut key = Vec::<u8>::new();
    for _ in 0..16 {
        key.push(rand::random::<u8>());
    }
    key
}

fn save_key(key: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = File::create("secret.key")?;
    file.write_all(key)?;
    Ok(())
}

fn save_data(text: &str, path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = File::create(path)?;
    file.write_all(text.as_bytes())?;
    Ok(())
}

fn encrypt_password(password: &str, key: &[u8]) -> Result<Vec<u8>, SymmetricCipherError> {
    let mut encryptor = aes::cbc_encryptor(aes::KeySize::KeySize128, key, key, blockmodes::PkcsPadding);
    let mut final_result = Vec::<u8>::new();
    let mut read_buffer = RefReadBuffer::new(password.as_bytes());
    let mut buffer = [0; 4096];
    let mut write_buffer = RefWriteBuffer::new(&mut buffer);

    loop {
        let result = encryptor.encrypt(&mut read_buffer, &mut write_buffer, true)?;
        final_result.extend(write_buffer.take_read_buffer().take_remaining().iter().map(|&i| i));

        match result {
            BufferResult::BufferUnderflow => break,
            BufferResult::BufferOverflow => { }
        }
    }

    Ok(final_result)
}

fn decrypt_password(encrypted_data: &str, key: &[u8]) -> Result<Vec<u8>, SymmetricCipherError> {
    let mut decryptor = aes::cbc_decryptor(aes::KeySize::KeySize128, key, key, blockmodes::PkcsPadding);
    let mut final_result = Vec::<u8>::new();
    let mut read_buffer = RefReadBuffer::new(encrypted_data.as_bytes());
    let mut buffer = [0; 4096];
    let mut write_buffer = RefWriteBuffer::new(&mut buffer);

    loop {
        let result = decryptor.decrypt(&mut read_buffer, &mut write_buffer, true)?;
        final_result.extend(write_buffer.take_read_buffer().take_remaining().iter().map(|&i| i));

        match result {
            BufferResult::BufferUnderflow => break,
            BufferResult::BufferOverflow => { }
        }
    }

    let debug: String =  from_utf8(final_result.as_slice()).unwrap().to_string();
    save_data(&debug, "debug.txt").unwrap();
    Ok(final_result)
}