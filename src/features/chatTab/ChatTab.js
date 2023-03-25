import React, { useState } from "react";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../gamedetail/GameDetails.css";
import Input from "antd/es/input/Input";

const ChatTab = () => {
  const user = useSelector((state) => state.user);
  const Role = user?.role;
  const faction = user.faction;
  const isJoinedSquad = user.isJoinedSquad;
  return (
    <div className="chat-tab-box">
      <div className="sidebar-buttons">
        <Space>
          <Button danger>All</Button>

          {faction === "zombie" || Role === "admin" ? (
            <Button danger>Zombies</Button>
          ) : null}
          {faction === "human" || Role === "admin" ? (
            <Button danger>Humans</Button>
          ) : null}
          {isJoinedSquad ? <Button danger>Squads</Button> : null}
        </Space>
      </div>
      <div className="chat-box">
        <div className="chats-container">
          <div className="chats-container-textbox">
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>{" "}
            <p
              style={{
                color: "black",
              }}
            >
              text
            </p>
          </div>
        </div>
        <Input
          style={{
            position: "absolute",
            bottom: 0,
            right: "20px",
            width: "18vw",
            marginRight: "9.5vw",
            marginBottom: "20px",
            border: "1px solid rgb(175, 174, 174)",
            boxShadow: "0px 0px 2px gray",
          }}
        />
        <Button
          style={{
            position: "absolute",
            bottom: 0,
            right: "20px",
            width: "6vw",

            marginRight: "2.6vw",
            marginBottom: "20px",
            border: "1px solid rgb(175, 174, 174)",
            boxShadow: "0px 0px 2px gray",
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatTab;
