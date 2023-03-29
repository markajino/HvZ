import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./features/landingpage/LandingPage";
import Login from "./features/login/Login";
import GameDetails from "./features/gamedetail/GameDetails";
import Register from "./features/register/Register";
import CreateGame from "./features/createGame/CreateGame";
import KeycloakRoute from "./keycloakRoutes";

import keycloak from "./keycloak";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//   },
//   {
//     path: "login/",
//     element: <Login />,
//   },
//   {
//     path: "register/",
//     element: <Register />,
//   },
//   {
//     path: "game/:gameId",
//     element: <GameDetails />,
//   },
//   {
//     path: "create-game",
//     element: <CreateGame />,
//   },
// ]);

function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register/" element={<Register />} />
          <Route path="register/" element={<Login />} />
          <Route
            path="game/:gameId"
            element={
              <KeycloakRoute>
                <GameDetails />
              </KeycloakRoute>
            }
          />
          <Route
            path="create-game"
            element={
              <KeycloakRoute role="ADMIN">
                <CreateGame />
              </KeycloakRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
