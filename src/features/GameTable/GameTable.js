import { Table, Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Map from "../Map";
import "./GameTable.css";
import {
  fetchAllGames,
  deleteGame,
  getGame,
  GetAllPlayers,
} from "../../API/API";
import keycloak from "../../keycloak";

export const GameTable = (props) => {
  const user = useSelector((state) => state.user);
  const Role = user.role;

  const [openjoinGameModal, setOpenjoinGameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [deleteGameId, setDeleteGameId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [circleCenter, setCircleCenter] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);

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
    const radius = distance / 2;

    setCircleCenter({
      lat: centerLat,
      lng: centerLng,
    });
    // setRadius(radius);
  };

  useEffect(() => {
    CircleFinder(
      gameData?.nw_lat,
      gameData?.nw_lng,
      gameData?.se_lat,
      gameData?.se_lng
    );
  }, [gameData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "State",
      dataIndex: "state",
      filters: [
        {
          text: "In progress",
          value: "IN_PROGRESS",
        },
        {
          text: "Registeration",
          value: "REGISTRATION",
        },
        {
          text: "Completed",
          value: "COMPLETED",
        },
      ],
      onFilter: (value, record) => record.state.startsWith(value),
    },
    {
      title: "Players",
      dataIndex: "players",
      sorter: (a, b) => a.players - b.players,
    },
    // {
    //   title: "Created at",
    //   dataIndex: "created_at",
    //   sorter: (a, b) => a.created_at - b.created_at,
    // },
  ];

  console.log(keycloak.token);
  keycloak.hasRealmRole("ADMIN") &&
    columns.push({
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Space>
            <Button type="primary" danger>
              <Link to={`/game/${record.game_id}`}>View</Link>
            </Button>

            <Button
              type="primary"
              danger
              onClick={(e) => {
                e.stopPropagation();
                setDeleteGameId(record.game_id);
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </Space>
        </div>
      ),
    });
  useEffect(() => {
    fetchAllGames().then((res) => {
      setTableData(res.data);
      res.data.map((game) => {
        GetAllPlayers(game.game_id).then((res) => {
          game.players = res.data.length;
        });
      });
    });
  }, [dataUpdated]);

  const data = [
    {
      game_id: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "2", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "3", //this is the game id we will get from the database
      name: "John Brown",
      state: "In progress",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
  ];

  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  return (
    <div>
      {keycloak.hasRealmRole("ADMIN") && (
        <Button style={{ marginBottom: "10px" }}>
          <Link to={"/create-game"}>Create Game</Link>
        </Button>
      )}
      <div className="game-table-container">
        {keycloak.authenticated ? (
          <Table
            columns={columns}
            dataSource={tableData}
            // onChange={onChange}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setGameId(record.game_id);
                  getGame(record.game_id).then((res) => {
                    setGameData(res.data);
                  });
                  setOpenjoinGameModal(true);
                },
              };
            }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            // onChange={onChange}
            pagination={false}
          />
        )}
      </div>

      {!keycloak.hasRealmRole("ADMIN") && (
        <Modal
          visible={openjoinGameModal}
          footer={null}
          onCancel={() => setOpenjoinGameModal(false)}
          style={{ marginBottom: "50px" }}
        >
          <h1>Join game</h1>

          <Map width={"30vw"} center={circleCenter} />
          <p>Are you sure you want to join this game?</p>
          <Button type="primary" danger>
            <Link to={`/game/${gameId}`}>Join</Link>
          </Button>
        </Modal>
      )}
      <Modal
        visible={openDeleteModal}
        footer={null}
        onCancel={() => setOpenDeleteModal(false)}
        style={{ marginBottom: "50px" }}
      >
        <h1>Delete game</h1>
        <p>Are you sure you want to delete this game?</p>

        <Button
          onClick={() => {
            deleteGame(deleteGameId)
              .then(() => setDataUpdated(!dataUpdated))
              .then(setOpenDeleteModal(false));
          }}
          type="primary"
          danger
        >
          Delete
        </Button>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
