import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App.jsx";

function Root() {
  return (
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<Root />);
} else {
  console.error("No se encontró el elemento raíz");
}
