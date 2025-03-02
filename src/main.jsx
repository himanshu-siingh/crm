import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // Import Ant Design's base styles (optional)
import "./custom.less"; // Import your custom font styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
