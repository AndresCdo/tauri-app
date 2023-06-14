#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{fs::{self, File, read}, collections::HashMap, io::{self, Write, Read}, path::{Path, self}, f32::consts::E};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
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

fn save_user(user: User) -> Result<(), Box<dyn std::error::Error>> {
    let mut users = match read_users_from_file("users.json") {
        Ok(users) => users,
        Err(_) => HashMap::new(),
    };
    users.insert(user.username.clone(), user);
    let users_json = serde_json::to_string(&users)?;
    let mut file = fs::File::create("users.json")?;
    file.write_all(users_json.as_bytes())?;
    Ok(())
}

fn read_users_from_file(path: &str ) -> Result<HashMap<String, User>, Box<dyn std::error::Error>> {
    if !Path::new(path).exists() {
        let mut file = File::create(path)?;
        let users = HashMap::new();
        let users_json = serde_json::to_string(&users)?;
        file.write_all(users_json.as_bytes())?;
        return Ok(users);
    } else {
        let mut file = File::open(path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        let users: HashMap<String, User> = serde_json::from_str(&contents)?;
        return Ok(users);
    }
}

fn is_user_allowed_to_login(username: &str, password: &str) -> Result<bool, Box<dyn std::error::Error>> {
    let users = read_users_from_file("users.json")?;
    match users.get(username) {
        Some(user) => Ok(user.is_allowed && user.password == password),
        None => Ok(false),
    }
}


#[tauri::command]
fn signup(username: String, password: String) -> bool {
    let user = User { username, password, is_allowed: true };
    save_user(user).is_ok()
}

#[tauri::command]
fn login(username: String, password: String) -> bool {
    let user = User { username, password, is_allowed: true };
    let users = read_users_from_file("users.json");
    if let Some(user) = users.unwrap().get(&user.username) {
        return user.password == user.password;
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
    format!("Hello, {}! You've been greeted from Rust! ", name)
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
