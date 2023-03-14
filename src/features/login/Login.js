import React from "react";
import { connect } from "react-redux";
import { Button, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";

export const Login = (props) => {
	return (
		<div className="auth-container">
			<div className="auth-box">
				<p>Login</p>
				<Input
					prefix={<UserOutlined style={{ fontSize: "24px" }} />}
					size="large"
					placeholder=" Username"
					style={{ width: "280px ", height: "50px" }}
				/>
				<Input.Password
					prefix={<LockOutlined style={{ fontSize: "24px" }} />}
					size="large"
					placeholder=" ********"
					style={{ width: "280px ", height: "50px" }}
				/>
				<Button size="large" style={{ width: "80px ", height: "40px" }}>
					Login
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
