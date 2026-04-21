import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./store/store"; // Import your store
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap App inside the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
