import React, { useState, useEffect } from "react";
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
import TextArea from "antd/es/input/TextArea";
import keycloak from "../../keycloak";
import { useParams } from "react-router-dom";
import { getGame, updateGame } from "../../API/API";

function GameDetails() {
  // const gameState = "REGISTRATION";
  const gameState = "IN_PROGRESS";
  // const gameState = "COMPLETED";
  const user = useSelector((state) => state.user);
  const faction = user.faction;
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditGame, setOpenEditGame] = useState(false);
  const [circleRadius, setCircleRadius] = useState(1000);
  const [circleCenter, setCircleCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [gameData, setGameData] = useState({});
  const [gameRefresher, setGameRefresher] = useState(false);
  const [editGameTitle, setEditGameTitle] = useState("");
  const [editGameState, setEditGameState] = useState("");

  let { gameId } = useParams();
  useEffect(() => {
    getGame(gameId).then((res) => {
      setGameData(res.data);
      setEditGameTitle(res.name);
      setEditGameState(res.state);
    });
  }, [gameRefresher]);

  const [openSquadModal, setOpenSquadModal] = useState(false);
  const [openJoinSquadModal, setOpenJoinSquadModal] = useState(false);
  const showSquadModal = () => {
    setOpenSquadModal(true);
  };
  const hideSquadModal = () => {
    setOpenSquadModal(false);
  };
  const hideJoinSquadModal = () => {
    setOpenJoinSquadModal(false);
  };
  const showJoinSquadModal = () => {
    setOpenJoinSquadModal(true);
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
      children: <ListItems gameId={gameData.game_id} />,
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
          showJoinSquadModal={showJoinSquadModal}
          hideJoinSquadModal={hideJoinSquadModal}
          openJoinSquadModal={openJoinSquadModal}
          gameId={gameId}
        />
      ),
    },
  ];
  /////////// Random point in circle ///////
  function random_point_in_disk(max_radius) {
    var r = Math.sqrt(Math.random()) * max_radius;
    var theta = Math.random() * 2 * Math.PI;
    return [r * Math.cos(theta), r * Math.sin(theta)];
  }

  const randomPoint = random_point_in_disk(circleRadius);

  const x = randomPoint[0];
  const y = randomPoint[1];
  const latitude = circleCenter.lat + y / 111111; // 1 degree of latitude is approximately 111111 meters
  const longitude =
    circleCenter.lng + x / (111111 * Math.cos(circleCenter.lat));

  /////////

  //// Making circle from random points ////
  const CircleFinder = (nw_lat, nw_lng, se_lat, se_lng) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (nw_lat * Math.PI) / 180;
    const lat2 = (se_lat * Math.PI) / 180;
    const lng1 = (nw_lng * Math.PI) / 180;
    const lng2 = (se_lng * Math.PI) / 180;

    const deltaLat = lat2 - lat1;
    const deltaLng = lng2 - lng1;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const centerLat = (nw_lat + se_lat) / 2;
    const centerLng = (nw_lng + se_lng) / 2;
    const radiuscircle = distance;
    console.log("radius", radiuscircle);
    setCircleCenter({
      lat: centerLat,
      lng: centerLng,
    });
    setCircleRadius(radiuscircle);
    // setRadius(radius);
  };

  useEffect(() => {
    CircleFinder(
      gameData?.nw_lat,
      gameData?.nw_lng,
      gameData?.se_lat,
      gameData?.se_lng
    );
  }, [gameData?.nw_lat]);
  //////////

  return (
    <div>
      <Navbar />
      <p className="game-title">{gameData?.name}</p>
      <p
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {gameData?.description}
      </p>
      <p
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        Game Status:{" "}
        {gameData?.state === "REGISTRATION"
          ? "Registration"
          : gameData?.state === "IN_PROGRESS"
          ? "In Progress"
          : "Completed"}
      </p>
      <div className="game-btn-container">
        {!keycloak.hasRealmRole("ADMIN") && (
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
        {keycloak.hasRealmRole("ADMIN") &&
          gameData?.state === "REGISTRATION" && (
            <div>
              <Button
                type="primary"
                danger
                onClick={() => {
                  updateGame(
                    gameData.game_id,
                    {
                      name: gameData.name,
                      description: gameData.description,
                      nw_lat: gameData.nw_lat,
                      nw_lng: gameData.nw_lng,
                      se_lat: gameData.se_lat,
                      se_lng: gameData.se_lng,
                    },
                    "IN_PROGRESS"
                  ).then(setGameRefresher(!gameRefresher));
                }}
              >
                Start Game
              </Button>
              {/* <Button danger onClick={() => setOpenEditGame(true)}>
                Edit Game
              </Button> */}
            </div>
          )}
        {keycloak.hasRealmRole("ADMIN") &&
          gameData?.state === "IN_PROGRESS" && (
            <div>
              <Button
                type="primary"
                danger
                onClick={() => {
                  updateGame(
                    gameData.game_id,
                    {
                      name: gameData.name,
                      description: gameData.description,
                      nw_lat: gameData.nw_lat,
                      nw_lng: gameData.nw_lng,
                      se_lat: gameData.se_lat,
                      se_lng: gameData.se_lng,
                    },
                    "COMPLETED"
                  ).then(setGameRefresher(!gameRefresher));
                }}
              >
                Complete Game
              </Button>
              <Button danger onClick={() => setOpenEditGame(true)}>
                Edit Game
              </Button>
            </div>
          )}
      </div>
      <div className="main-container">
        <div className="map-box">
          <Map center={circleCenter} radius={circleRadius} />
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
        footer={null}
      >
        <div>
          <label>
            Game Title
            <Input
              placeholder="Game title"
              value={editGameTitle || gameData.name}
              onChange={(e) => setEditGameTitle(e.target.value)}
            />
          </label>
          {/* <label>
            Game State
            <Input
              placeholder="Game Status"
              value={editGameState}
              onChange={(e) => setEditGameState(e.target.value)}
            />
          </label> */}
          <Button
            style={{ marginTop: "1vw" }}
            type="primary"
            danger
            onClick={() => {
              updateGame(
                gameData.game_id,
                {
                  name: editGameTitle,
                  description: gameData.description,
                  nw_lat: gameData.nw_lat,
                  nw_lng: gameData.nw_lng,
                  se_lat: gameData.se_lat,
                  se_lng: gameData.se_lng,
                },
                gameData.state
              )
                .then(hideEditModal)
                .then(setGameRefresher(!gameRefresher));
            }}
          >
            Edit
          </Button>
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
            <p>Latitude: {latitude} </p>
            <p>Longitude: {longitude}</p>
          </div>
        </Modal>
      ) : faction === "zombie" ? (
        <Modal
          title="Faction: Zombie"
          open={openInfo}
          onOk={hideInfoModal}
          onCancel={hideInfoModal}
          okText="Done"
          footer={null}
        >
          <div>Were you patient zero : no</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "flex",
                fontSize: "16px",
                alignItems: "center",
                // width: "60%",
                marginRight: "5px",
              }}
            >
              Latitude:
            </p>
            <Input placeholder="Enter Latitude" defaultValue={latitude} />
            <p
              style={{
                display: "flex",
                fontSize: "16px",
                margin: "10px",
                alignItems: "center",
                // width: "60%",
              }}
            >
              Longitude:
            </p>
            <Input placeholder="Enter Longitude" defaultValue={longitude} />
          </div>
          <p
            style={{
              // display: "flex",
              fontSize: "16px",
              margin: "0px",
              // margin: "10px",
              // alignItems: "center",
              // textAlign: "center",
              // width: "60%",
            }}
          >
            Description
          </p>
          <TextArea placeholder="Description of the kill" />
          <div
            style={{
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",

              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                width: "60%",
              }}
            >
              Enter bite code:
            </p>

            <Input placeholder="Bite code of the human" />
            <Button
              danger
              type="primary"
              style={{
                marginLeft: "10px",
              }}
            >
              Register kill
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default GameDetails;
