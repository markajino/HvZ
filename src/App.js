import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./features/landingpage/LandingPage";
import Login from "./features/login/Login";
import GameDetails from "./features/gamedetail/GameDetails";
import Register from "./features/register/Register";
import CreateGame from "./features/createGame/CreateGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "game/:gameId",
    element: <GameDetails />,
  },
  {
    path: "create-game",
    element: <CreateGame />,
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
