import React from "react";
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import LandingPage from "./features/landingpage/LandingPage";
import Login from "./features/login/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "login/",
		element: <Login />,
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
