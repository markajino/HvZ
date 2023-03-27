import React,{ useEffect } from "react";
import { Button, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined, BorderRightOutlined, BorderLeftOutlined } from "@ant-design/icons";
import "./Register.css";
import keycloak from "../keycloack";


export const Register = (props) => {
    useEffect(() => {
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            console.log('Authenticated:', authenticated);
        });
    }, []);
    return (
        <div className="auth-container">
            <div className="auth-box-reg">
                <p>Register</p>
                <div className="auth-input-btns">
                    <Input
                        prefix={<BorderLeftOutlined style={{ fontSize: "24px" }} />}
                        size="large"
                        placeholder=" First Name"
                        style={{ width: "280px", height: "50px" }}
                    />
                    <Input
                        prefix={<BorderRightOutlined style={{ fontSize: "24px" }} />}
                        size="large"
                        placeholder=" Last Name"
                        style={{ width: "280px", height: "50px", marginBottom: "20px" }}
                    />
                    <Input
                        prefix={<MailOutlined style={{ fontSize: "24px" }} />}
                        size="large"
                        placeholder=" Email"
                        style={{ width: "280px", height: "50px", marginBottom: "20px" }}
                    />
                    <Input
                        prefix={<UserOutlined style={{ fontSize: "24px" }} />}
                        size="large"
                        placeholder=" Username"
                        style={{ width: "280px", height: "50px" }}
                    />
                    <Input.Password
                        prefix={<LockOutlined style={{ fontSize: "24px" }} />}
                        size="large"
                        placeholder=" ********"
                        style={{ width: "280px", height: "50px", marginBottom: "30px" }}
                    />
                </div>
                <Button size="large" style={{ width: "90px ", height: "40px", textAlign: "center" }}>
                    Register
                </Button>
            </div>
        </div>
    );
};

export default Register
