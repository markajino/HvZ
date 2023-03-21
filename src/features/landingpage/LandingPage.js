import React from "react";
import { connect } from "react-redux";
import GameTable from "../GameTable/GameTable";
import Navbar from "../navbar/Navbar";

export const LandingPage = (props) => {
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
