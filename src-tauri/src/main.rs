#![cfg_attr(not(debug_assertions), windows_subsystem = "linux")]
mod crypto;
use std::{fs::{self, File, read}, collections::HashMap, io::{self, Write, Read}, path::{Path, self}, f32::consts::E};
use serde::{Serialize, Deserialize};
use keyring;
use std::error::Error;
use std::str::from_utf8;
use base64::{encode};
use relative_path::RelativePath;

const APP_DATA_PATH: &str = "~/tauri-app/";

#[derive(Serialize, Deserialize, Debug, Clone)]
struct User {
    username: String,
    password: String,
    is_allowed: bool,
}

#[derive(Serialize, Deserialize, Debug)]
struct State {
    state: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct SessionData {
    user: User,
    session_id: String,
    state: State,
}

fn save_user(_user: User) -> Result<(), Box<dyn std::error::Error>> {
    let mut users: HashMap<String, User> = match read_users_from_file("users.json") {
        Ok(users) => users,
        Err(_) => HashMap::new(),
    };

    users.insert(_user.username.clone(), _user.clone());
    let users_json = serde_json::to_string(&users)?;
    


    let mut file = fs::File::create("users.json")?;
    file.write_all(users_json.as_bytes())?;
    Ok(())
}

fn read_users_from_file(path: &str ) -> Result<HashMap<String, User>, Box<dyn std::error::Error>> {
    if !Path::new(path).exists() {
        let mut file = File::create(path)?;
        let users:HashMap<String, User> = HashMap::new();
        let users_json = serde_json::to_string(&users)?;
        file.write_all(users_json.as_bytes())?;
        return Ok(users);
    } else {
        let mut file = File::open(path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        let users:HashMap<String, User> = serde_json::from_str(&contents)?;
        return Ok(users);
    }
}

fn is_user_allowed_to_login(username: &str, password: &str) -> Result<bool, Box<dyn std::error::Error>> {
    let users = read_users_from_file("~/tauri-app/users.json")?;
    match users.get(username) {
        Some(user) => Ok(user.is_allowed && user.password == password),
        None => Ok(false),
    }
}

// fn storage_password(service: &str, username: &str, password: &str) -> Result<(), Box<dyn Error>> {
//     let keyring = keyring::Entry::new(service, username);
//     keyring.storage_password(service, username, password)?;
//     Ok(())
// }

// fn verify_password(service: &str, username: &str, password: &str) -> Result<(), Box<dyn Error>> {
//     let keyring = Keyring::new(service, username);
//     let stored_password = keyring.get_password()?;

//     if stored_password != password {
//         return Err("Password does not match".into());
//     }
//     Ok(())
// }

#[tauri::command]
fn signup(username: String, password: String) -> bool {
    let user = User { username: username.clone() , password, is_allowed: true };
    if let Ok(encrypted_bytes) = crypto::encrypt(&user.password) {
        let user = User { username: username.clone(), password: encode(&encrypted_bytes), is_allowed: true };
        if let Ok(_) = save_user(user) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

#[tauri::command]
fn login(username: String, password: String) -> bool {
    // Check if the file exists and create it if it doesn't
    if let Ok(users) = read_users_from_file("users.json") {
        if let Some(user) = users.get(&username) {

            if let Ok(decrypted_password) = crypto::decrypt(&user.password) {
                // if decrypted_password == password {
                //     return true;
                // } else {
                //     return false;
                // }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// #[tauri::command]
// fn resume_session() {
//     let session_data = read_users_from_file();
//     if let Ok(session_data) = session_data {
//         match session_data.get("session") {
//             "active" => println!("Hello, {}! You've been greeted from Rust!", session_data.user.username),
//             "inactive" => println!("Session is inactive"),
//             "locked" => println!("Session is locked"),
//             "terminated" => println!("Session is terminated"),
//             "suspended" => println!("Session is suspended"),
//             "expired" => println!("Session is expired"),
//             "unknown" => println!("Session is unknown"),
//             "invalid" => println!("Session is invalid"),
//             _ => println!("Session is in an undefined state"),
//         }
//     } else {
//         println!("Error reading secret file");
//     }
// }

#[tauri::command]
fn greet(name: &str) -> String {
    if name.is_empty() {
        return "Hello, World! You've been greeted from Rust!".to_string();
    }
    format!("Hello, {}! You've been greeted from Rust!\n", name)
}

#[tauri::command]
fn bmi(weight: &str, height: &str, name: &str) -> String {
    let weight: f32 = match weight.parse() {
        Ok(w) => w,
        Err(_) => return "Invalid weight ".to_string(),
    };

    let height: f32 = match height.parse() {
        Ok(h) => h,
        Err(_) => return "Invalid height ".to_string(),
    };

    let bmi = weight / (height * height);

    let description = match bmi {
        x if x < 18.5 => "underweight",
        x if x < 25.0 => "normal weight",
        x if x < 30.0 => "overweight",
        _ => "obese",
    };

    if name.is_empty() {
        format!("You are {} ", description)
    } else {
        format!("{} is {} ", name, description)
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, login, bmi, signup])
        .run(tauri::generate_context!())
        .expect("error while running tauri application ");
}
