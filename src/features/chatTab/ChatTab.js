import React, { useState, useEffect } from "react";
import { Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../gamedetail/GameDetails.css";
import Input from "antd/es/input/Input";
import keycloak from "../../keycloak";
import { getChat, sendChat } from "../../API/API";

const ChatTab = ({ gameId, userObj }) => {
  console.log("GameId", gameId);
  const user = useSelector((state) => state.user);
  const Role = user?.role;
  const faction = user.faction;

  const isJoinedSquad = user.isJoinedSquad;
  const [chatData, setChatData] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [filteredChatData, setFilteredChatData] = useState([]);
  const [message, setMessage] = useState("");
  const [scope, setScope] = useState("GLOBAL");

  useEffect(() => {
    getChat(gameId, userObj?.player_id).then((res) => {
      console.log("Chat", res);
      setChatData(res.data);
      setFilteredChatData(res.data);
    });
  }, [gameId, refresher]);

  return (
    <div className="chat-tab-box">
      <div className="sidebar-buttons">
        <Space>
          <Button
            dange
            onClick={() => {
              setScope("GLOBAL");
              setFilteredChatData(chatData);
            }}
          >
            All
          </Button>

          {!userObj?.human || keycloak.hasRealmRole("ADMIN") ? (
            <Button
              danger
              onClick={() => {
                setScope("FACTION");
                setFilteredChatData(
                  chatData.filter((chat) => chat.chatScope === "FACTION")
                );
              }}
            >
              Zombies
            </Button>
          ) : null}
          {userObj?.human || keycloak.hasRealmRole("ADMIN") ? (
            <Button
              danger
              onClick={() => {
                setScope("FACTION");
                setFilteredChatData(
                  chatData.filter((chat) => chat.chatScope === "FACTION")
                );
              }}
            >
              Humans
            </Button>
          ) : null}
          {isJoinedSquad ? (
            <Button
              danger
              onClick={() => {
                setScope("SQUAD");
                setFilteredChatData(
                  chatData.filter((chat) => chat.chatScope === "SQUAD")
                );
              }}
            >
              Squads
            </Button>
          ) : null}
        </Space>
      </div>
      <div className="chat-box">
        <div className="chats-container">
          <div className="chats-container-textbox">
            {filteredChatData.length > 0 ? (
              filteredChatData?.map((chat) => (
                <p
                  className="chats-container-textbox-text"
                  style={{ color: "black" }}
                >
                  {`${chat.player_name}: ${chat.message}`}
                </p>
              ))
            ) : (
              <p style={{ color: "black" }}>no data</p>
            )}
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
          placeholder="Type your message here"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
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
          onClick={() => {
            const chatmessage = {
              message: message,
              player: 1, //change this to user.id
            };
            // faction will be changed to user.faction
            sendChat(gameId, chatmessage, scope).then((res) => {
              console.log("Chat", res);
              setMessage("");
              setRefresher(!refresher);
            });
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatTab;
