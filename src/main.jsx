import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    // e.g., prompt the user, then:
    console.log("New version available! Refresh to update.");
    const response = confirm("New version available! Refresh?");
    if (response === true) {
      updateSW(true); // calls skipWaiting and reloads the page
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
