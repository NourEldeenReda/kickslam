import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.tsx";
import { StoreProvider } from "./context/StoreProvider";
import { ProductsProvider } from "./context/ProductsProvider";
import { AuthProvider } from "./context/AuthProvider";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
