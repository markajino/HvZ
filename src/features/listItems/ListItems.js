import React, { useEffect, useState } from "react";

import { Tabs, Modal, List, Button, Space, Select } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import "../gamedetail/GameDetails.css";
import keycloak from "../../keycloak";
import { deletePlayer, GetAllPlayers, updatePlayer } from "../../API/API";

const ListItems = ({ gameId, userObj }) => {
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
  const [playersInList, setPlayersInList] = useState(players);
  const [openPlayerDeleteModal, setOpenPlayerDeleteModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [playerToView, setPlayerToView] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    GetAllPlayers(gameId, userObj.player_id).then((res) => {
      console.log("Players", res);
      setPlayers(res.data);
      setPlayersInList(res.data);
    });
  }, [gameId, refresh]);
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
                    setPlayersInList(players);
                  }}
                >
                  All
                </Button>
                {userObj.human === true || keycloak.hasRealmRole("ADMIN") ? (
                  <Button
                    danger
                    onClick={() => {
                      setPlayersInList(
                        players.filter((player) => player.human)
                      );
                    }}
                  >
                    Humans
                  </Button>
                ) : null}
                {keycloak.hasRealmRole("ADMIN") || !userObj?.human ? (
                  <Button
                    danger
                    onClick={() => {
                      setPlayersInList(
                        players.filter((player) => !player.human)
                      );
                    }}
                  >
                    Zombies
                  </Button>
                ) : null}
              </Space>
            </div>
          }
          bordered
          dataSource={playersInList}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p>{item?.full_name}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {keycloak.hasRealmRole("ADMIN") ? (
                    <Space>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                          setOpenPlayerModal(true);
                          setPlayerToView(item);
                        }}
                      />
                      <DeleteOutlined
                        style={{ fontSize: "25px" }}
                        onClick={() => {
                          setOpenPlayerDeleteModal(true);
                          setPlayerToDelete(item);
                        }}
                      />
                    </Space>
                  ) : (
                    <p>{item?.human ? item?.biteCode : null}</p>
                  )}
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
        footer={null}
      >
        <p>Player Name: {playerToView?.full_name}</p>
        {!playerToView?.human ? (
          <div>
            <p>Player Faction: Zombie</p>
            <p>Is zero patient: {playerToView?.patient_zero ? "yes" : "no"}</p>
            {keycloak.hasRealmRole("ADMIN") && (
              <Button
                type="primary"
                danger
                onClick={() => {
                  updatePlayer(gameId, playerToView.player_id).then((res) => {
                    setPlayers(
                      players.filter(
                        (player) => player.player_id !== playerToView.player_id
                      )
                    );
                    setRefresh(!refresh);

                    setOpenPlayerModal(false);
                  });
                }}
              >
                toggle player faction
              </Button>
            )}
          </div>
        ) : (
          <div>
            <p>Player Faction: Human</p>
            <p>Bite Code: {playerToView?.biteCode}</p>
            {keycloak.hasRealmRole("ADMIN") && (
              <Button
                type="primary"
                danger
                onClick={() => {
                  updatePlayer(gameId, playerToView.player_id).then((res) => {
                    setRefresh(!refresh);
                    setOpenPlayerModal(false);
                  });
                }}
              >
                toggle player faction
              </Button>
            )}
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
          onClick={() => {
            deletePlayer(gameId, playerToDelete.player_id).then((res) => {
              console.log("Delete Player", res);
              setPlayers(
                players.filter(
                  (player) => player.player_id !== playerToDelete.player_id
                )
              );
              setOpenPlayerDeleteModal(false);
              setRefresh(!refresh);
            });
          }}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
      </Modal>
    </div>
  );
};

export default ListItems;
