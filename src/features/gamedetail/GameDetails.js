import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Tabs, Modal, List, Button, Space } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import Map from "../Map";
import "./GameDetails.css";
import Input from "antd/es/input/Input";
import Icon from "@ant-design/icons/lib/components/Icon";

const ListItems = () => {
  const Role = "admin";
  const faction = "human";
  const data = [
    {
      name: "John",
      faction: "zombie",
    },
    {
      name: "doe",
      faction: "human",
    },
    {
      name: "Random Name",
      faction: "zombie",
    },
  ];

  const [players, setPlayers] = useState(data);
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [openPlayerDeleteModal, setOpenPlayerDeleteModal] = useState(false);
  return (
    <div class="list-tab-box">
      <List
        header={
          <div className="sidebar-buttons">
            <Space>
              <Button
                onClick={() => {
                  setPlayers(data);
                }}
              >
                All
              </Button>
              <Button
                onClick={() => {
                  setPlayers(
                    data.filter((player) => player.faction === "human")
                  );
                }}
              >
                Humans
              </Button>
              <Button
                onClick={() => {
                  setPlayers(
                    data.filter((player) => player.faction === "zombie")
                  );
                }}
              >
                Zombies
              </Button>
            </Space>
          </div>
        }
        bordered
        dataSource={players}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>{item.name}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {Role === "admin" ? (
                  <Space>
                    <InfoCircleOutlined
                      style={{ fontSize: "20px" }}
                      onClick={() => setOpenPlayerModal(true)}
                    />
                    <DeleteOutlined
                      style={{ fontSize: "25px" }}
                      onClick={() => setOpenPlayerDeleteModal(true)}
                    />
                  </Space>
                ) : null}
              </div>
            </div>
          </List.Item>
        )}
        //style={{ width: "450px" }}
      />
      <Modal
        title="Player Details"
        visible={openPlayerModal}
        onOk={() => setOpenPlayerModal(false)}
        onCancel={() => setOpenPlayerModal(false)}
      >
        <p>Player Name: John</p>
        {faction !== "zombie" ? (
          <div>
            <p>Player Faction: Zombie</p>
            <p>Is zero patient: no</p>
          </div>
        ) : (
          <div>
            <p>Player Faction: Human</p>
            <p>Bite Code: FGR##$</p>
          </div>
        )}
      </Modal>
      <Modal
        title="Delete Player"
        visible={openPlayerDeleteModal}
        footer={null}
      >
        <p>Are you sure you want to delete this player?</p>
        <Button danger onClick={() => setOpenPlayerDeleteModal(false)}>
          Cancel
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => setOpenPlayerDeleteModal(false)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
      </Modal>
    </div>
  );
};

const ChatTab = () => {
  const Role = "admin";
  const faction = "human";
  return (
    <div className="chat-tab-box">
      <div className="sidebar-buttons">
        <Space>
          <Button>All</Button>

          {faction === "zombie" || Role === "admin" ? (
            <Button>Zombies</Button>
          ) : null}
          {faction === "human" || Role === "admin" ? (
            <Button>Humans</Button>
          ) : null}
        </Space>
      </div>
      <div className="chat-box">
        <Input
          style={{
            position: "absolute",
            bottom: 0,
            right: "20px",
            width: "25vw",
            marginRight: "30px",
            marginBottom: "10px",
          }}
        />
      </div>
    </div>
  );
};

function GameDetails() {
  const faction = "human";
  const Role = "admi";
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const items = [
    {
      key: "1",
      label: "Chat",
      children: ChatTab(),
    },
    {
      key: "2",
      label: `Player List`,
      children: ListItems(),
    },
  ];
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditGame, setOpenEditGame] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const showInfoModal = () => {
    setOpenInfo(true);
  };
  const hideInfoModal = () => {
    setOpenInfo(false);
  };
  const showEditModal = () => {
    setOpenEditGame(true);
  };
  const hideEditModal = () => {
    setOpenEditGame(false);
  };

  return (
    <div>
      <Navbar />
      <p className="game-title">Game name</p>

      <div className="game-btn-container">
        {Role !== "admin" && (
          <div>
            <Button onClick={showModal}>Leave Game</Button>
            <Button onClick={showInfoModal}>Player Info</Button>
          </div>
        )}
        {Role === "admin" && (
          <div>
            <Button type="primary" danger>
              Start Game
            </Button>
            <Button danger onClick={() => setOpenEditGame(true)}>
              Edit Game
            </Button>
          </div>
        )}
      </div>
      <div className="main-container">
        <div className="map-box">
          <Map />
        </div>
        <div className="chat-box">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
      <Modal
        title="Leave Game"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Yes"
        cancelText="cancel"
      >
        <p>Are you sure you want to leave the game?</p>
      </Modal>
      <Modal
        title="Edit Game"
        open={openEditGame}
        onOk={hideEditModal}
        onCancel={hideEditModal}
        okText="Done"
      >
        <div>
          <label>
            Game Title
            <Input placeholder="Game title" />
          </label>
          <label>
            Game Status
            <Input placeholder="Game Status" />
          </label>
        </div>
      </Modal>
      {faction === "human" ? (
        <Modal
          title="Faction: Human"
          open={openInfo}
          onOk={hideInfoModal}
          onCancel={hideInfoModal}
          okText="Done"
        >
          <div>
            bite code
            <p>FREWF$#F</p>
          </div>
          <div>
            <p>Latitude: {coords?.latitude} </p>
            <p>Longitude: {coords?.longitude}</p>
          </div>
        </Modal>
      ) : faction === "zombie" ? (
        <Modal
          title="Faction: Zombie"
          open={openInfo}
          onOk={hideInfoModal}
          onCancel={hideInfoModal}
          okText="Done"
        >
          <label>
            Enter bite code
            <input />
          </label>
          <Button>Register kill</Button>
          <div>Were you patient zero : no</div>
          <div>
            <p>Latitude: {coords?.latitude} </p>
            <p>Longitude: {coords?.longitude}</p>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default GameDetails;
