import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createUser } from "../../API/API";
import keycloak from "../../keycloak";
import GameTable from "../GameTable/GameTable";
import Navbar from "../navbar/Navbar";

export const LandingPage = (props) => {
  useEffect(() => {
    createUser();
  }, [keycloak.token]);
  return (
    <div>
      <Navbar />
      <div className="game-table">
        <p className="games-heading">Games</p>
        <GameTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
