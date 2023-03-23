import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Tabs, Modal, List, Button, Space } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import ChatTab from "../chatTab/ChatTab";
import ListItems from "../listItems/ListItems";
import Squads from "../squads/Squads";
import Map from "../Map";
import "./GameDetails.css";
import Input from "antd/es/input/Input";

function GameDetails() {
  const user = useSelector((state) => state.user);
  const faction = user.faction;
  const Role = user.role || "";
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditGame, setOpenEditGame] = useState(false);

  const [openSquadModal, setOpenSquadModal] = useState(false);
  const showSquadModal = () => {
    setOpenSquadModal(true);
  };
  const hideSquadModal = () => {
    setOpenSquadModal(false);
  };
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
  const items = [
    {
      key: "1",
      label: "Chat",
      children: <ChatTab />,
    },
    {
      key: "2",
      label: `Player List`,
      children: <ListItems />,
    },
    {
      key: "3",
      label: `Squads`,
      children: (
        <Squads
          setOpenSquadModal={setOpenSquadModal}
          openSquadModal={openSquadModal}
          showSquadModal={showSquadModal}
          hideSquadModal={hideSquadModal}
        />
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <p className="game-title">Game name</p>

      <div className="game-btn-container">
        {Role !== "admin" && (
          <div>
            <Button type="primary" danger onClick={showModal}>
              Leave Game
            </Button>
            <Button danger onClick={showInfoModal}>
              Player Info
            </Button>
            <Button danger onClick={showSquadModal}>
              squad | {user.squadName}
            </Button>
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
          <Tabs defaultActiveKey="1" items={items} style={{ color: "black" }} />
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
