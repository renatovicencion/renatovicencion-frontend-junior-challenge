import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	// Removí el React.StrictMode para que los componentes no se rendericen 2 veces en el ambiente de desarrollo,
	// en producción esto no ocurre
	<App />
);
