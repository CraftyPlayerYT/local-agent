
#[tauri::command]
fn greet(name: &str) -> String {
    format!(
        "Hello, {}! You've been greeted from Rust!",
        name
    )
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(
            tauri::generate_handler![greet]
        )
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested {
                api,
                ..
            } = event {
                // Empêche la fermeture définitive.
                api.prevent_close();

                // Cache la fenêtre au lieu de la fermer.
                if let Err(error) = window.hide() {
                    eprintln!(
                        "Impossible de masquer la fenêtre : {error}"
                    );
                }
            }
        })
        .run(tauri::generate_context!())
        .expect(
            "Erreur lors du lancement de local-agent"
        );
}
