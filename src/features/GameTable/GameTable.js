import { Table, Button, Modal, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, redirect } from "react-router-dom";
import Map from "../Map";
import "./GameTable.css";

export const GameTable = (props) => {
  const Role = "admin";

  const [openjoinGameModal, setOpenjoinGameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
          value: "In progress",
        },
        {
          text: "Register",
          value: "Register",
        },
        {
          text: "Completed",
          value: "Completed",
        },
      ],
      onFilter: (value, record) => record.state.startsWith(value),
    },
    {
      title: "Players",
      dataIndex: "players",
      sorter: (a, b) => a.players - b.players,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
    },
  ];
  Role === "admin" &&
    columns.push({
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Space>
            <Button type="primary" danger>
              <Link to={`/game/`}>View</Link>
            </Button>

            <Button
              type="primary"
              danger
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </Space>
        </div>
      ),
    });

  const data = [
    {
      key: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "In progress",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
    {
      key: "1", //this is the game id we will get from the database
      name: "John Brown",
      state: "Register",
      players: "4/5",
      created_at: "10/3/23 10:30 am",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      {Role === "admin" && (
        <Button style={{ marginBottom: "10px" }}>
          <Link to={"/create-game"}>Create Game</Link>
        </Button>
      )}
      <div className="game-table-container">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setOpenjoinGameModal(true);
              },
            };
          }}
        />
      </div>

      {Role !== "admin" && (
        <Modal
          visible={openjoinGameModal}
          footer={null}
          onCancel={() => setOpenjoinGameModal(false)}
          style={{ marginBottom: "50px" }}
        >
          <h1>Join game</h1>

          <Map width={"30vw"} />
          <p>Are you sure you want to join this game?</p>
          <Button type="primary" danger>
            <Link to={`/game/`}>Join</Link>
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

        <Button type="primary" danger>
          <Link to={`/game/`}>Delete</Link>
        </Button>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
