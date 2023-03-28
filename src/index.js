import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import "./index.css";
import { initialize } from "./keycloak";

const container = document.getElementById("root");
const root = createRoot(container);

//Display a loading screen when connecting to Keycloak
root.render(<p>Connecting to Keycloak...</p>)

initialize()
	.then(()=> {
		root.render(
			<React.StrictMode>
				<Provider store={store}>
					<App />
				</Provider>
			</React.StrictMode>
		);
	})
	.catch(() => {
		root.render(
			<h1>Could nto connect to Keycloak server.</h1>
		)
	})

