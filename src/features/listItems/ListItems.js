import React, { useState } from "react";

import { Tabs, Modal, List, Button, Space } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import "../gamedetail/GameDetails.css";

const ListItems = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Role = user?.role;
  const faction = user.faction;
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
      <div className="list-container">
        <List
          header={
            <div className="sidebar-buttons">
              <Space>
                <Button
                  danger
                  onClick={() => {
                    setPlayers(data);
                  }}
                >
                  All
                </Button>
                <Button
                  danger
                  onClick={() => {
                    setPlayers(
                      data.filter((player) => player.faction === "human")
                    );
                  }}
                >
                  Humans
                </Button>
                <Button
                  danger
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
      </div>
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
        onCancel={() => setOpenPlayerDeleteModal(false)}
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

export default ListItems;
