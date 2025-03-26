import { useEffect } from "react";
import CurrentMode from "./components/CurrentMode";
import Layout from "./hoc/Layout";
import Provider from "./state/state";

function App() {
  // Prevent the user from leaving the page on accident
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };

  return (
    <Provider>
      <Layout>
        <CurrentMode />
      </Layout>
    </Provider>
  );
}

export default App;
