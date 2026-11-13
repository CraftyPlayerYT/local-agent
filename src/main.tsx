import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ConnectivityGate from "./ConnectivityGate";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConnectivityGate>
      <App />
    </ConnectivityGate>
  </React.StrictMode>,
);
