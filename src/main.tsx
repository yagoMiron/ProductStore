import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/fonts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
