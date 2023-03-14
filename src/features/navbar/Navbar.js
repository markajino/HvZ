import React from "react";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import { QuestionOutlined } from "@ant-design/icons";

import "./Navbar.css";

export const Navbar = (props) => {
	return (
		<div>
			<div className="navbar-container">
				{/* <img /> */}
				<p className="navbar-heading">Humans vs Zombies</p>
				<div className="button-space">
					<Button
						type="primary"
						className="nav-btn"
						style={{ backgroundColor: "#000000", boxShadow: "0px 0px 5px 0.3" }}
						size="large"
					>
						Register
					</Button>
					<Button
						className="nav-btn"
						style={{ backgroundColor: "white", color: "black" }}
						size="large"
						href="/login"
					>
						Login
					</Button>

					<Tooltip title="hello this is tooltip hello this is toolti hello this is toolti hello this is toolti hello this is toolti">
						<QuestionOutlined size={"32px"} style={{ fontSize: "28px" }} />
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
