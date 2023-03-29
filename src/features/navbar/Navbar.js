import React from "react";
import { connect, useSelector } from "react-redux";
import { Button, Tooltip } from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import "./Navbar.css";
import userSlice from "../User/userSlice";
import { Link } from "react-router-dom";
import keycloak from "../../keycloak";

export const Navbar = (props) => {
  console.log("userinfo", keycloak.hasRealmRole("ADMIN"));
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="navbar-container">
        {/* <img /> */}
        <Link to="/">
          <p className="navbar-heading">Humans vs Zombies</p>
        </Link>
        {!keycloak.authenticated ? (
          <div className="button-space">
            {/* <Button
              type="primary"
              className="nav-btn"
              style={{
                backgroundColor: "#000000",
                boxShadow: "0px 0px 5px 0.3",
              }}
              size="large"
              href="/register"
            >
              Register
            </Button> */}
            <Button
              className="nav-btn"
              style={{ backgroundColor: "white", color: "black" }}
              size="large"
              // keycloak.login();
              onClick={() => {
                keycloak.login();
              }}
            >
              Login
            </Button>
            <Tooltip title="Similar to tag, Humans v Zombies is an interactive game where zombies attempt to decimate the human population. Everyone is equipped with a nerf gun except for the couple of zombies to start off the game. Zombies can turn humans into zombies by touching a human with both hands. Humans can kill zombies by shooting them with a nerf gun (the zombies then go to the regeneration zone for a few minutes before they can rejoin the game). The game is over once there is a small group of humans left. Alliances and fun encouraged!">
              <QuestionOutlined size={"32px"} style={{ fontSize: "28px" }} />
            </Tooltip>
          </div>
        ) : (
          <div className="button-space-loggedIn">
            <p>{keycloak.idTokenParsed.preferred_username}</p>
            <Button
              className="nav-btn"
              style={{ backgroundColor: "white", color: "black" }}
              size="large"
              onClick={() => {
                keycloak.logout();
              }}
            >
              Logout
            </Button>
            <Tooltip title="Similar to tag, Humans v Zombies is an interactive game where zombies attempt to decimate the human population. Everyone is equipped with a nerf gun except for the couple of zombies to start off the game. Zombies can turn humans into zombies by touching a human with both hands. Humans can kill zombies by shooting them with a nerf gun (the zombies then go to the regeneration zone for a few minutes before they can rejoin the game). The game is over once there is a small group of humans left. Alliances and fun encouraged!">
              <QuestionOutlined size={"32px"} style={{ fontSize: "28px" }} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
