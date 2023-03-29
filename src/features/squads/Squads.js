import { Button, Input, InputNumber, Space, List, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "../gamedetail/GameDetails.css";
import { useSelector } from "react-redux";
import { createSqaud, GetAllSquads } from "../../API/API";
import keycloak from "../../keycloak";

function Squads({
  hideSquadModal,
  showSquadModal,
  openSquadModal,
  setOpenSquadModal,
  openJoinSquadModal,
  setOpenJoinSquadModal,
  hideJoinSquadModal,
  showJoinSquadModal,
  gameId,
}) {
  const user = useSelector((state) => state.user);
  const faction = user.faction;

  const data = [
    {
      name: "squad 1",
      active_members: 5,
      deceased_members: 2,
      deceased: true,
      human: false,
    },
    {
      name: "squad 1",
      active_members: 5,
      deceased_members: 2,
      deceased: false,
      human: false,
    },
    {
      name: "squad 1",
      active_members: 5,
      deceased_members: 2,
      deceased: true,
      human: true,
    },
  ];
  const [squadData, setSquadData] = useState(data);
  const [squadName, setSquadName] = useState("");
  const [refresher, setRefresher] = useState(false);

  useEffect(() => {
    if (faction === "human") {
      setSquadData(data.filter((squad) => squad.human === true));
    } else if (faction === "zombie") {
      setSquadData(data.filter((squad) => squad.human === false));
    }
  }, [faction]);

  useEffect(() => {
    GetAllSquads(gameId).then((res) => {
      console.log("Squads", res);
      setSquadData(res.data);
    });
  }, [gameId, refresher]);

  return (
    <div className="squads-tab-box">
      {!keycloak.hasRealmRole("ADMIN") && (
        <div className="squads-box-details">
          <p className="squads-title">Create Squads</p>
          <Space direction="vertical">
            <div className="squads-inputs">
              <Input
                placeholder="Name"
                className="squads-inputfield"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
              />
              <Button
                danger
                onClick={() => {
                  createSqaud(gameId, squadName).then((res) => {
                    // add a player id Attribute after squadName
                    console.log("Squad Created", res);
                    setSquadName("");
                    setRefresher(!refresher);
                  });
                }}
              >
                Create
              </Button>
            </div>
          </Space>
        </div>
      )}
      <div className="squad-join-container">
        <p className="squads-title">Join Squads</p>
        <List
          dataSource={squadData}
          renderItem={(squad) => (
            <List.Item>
              <div className="squad-join-box">
                <p className="squad-join-title">{squad.name}</p>
                <div>
                  <p style={{ margin: 0 }} className="squad-join-members">
                    Active Members: {squad.active_members}
                  </p>
                  {faction === "human" && (
                    <p style={{ marginTop: 0 }}>
                      Deceased Members: {squad.deceased_members}
                    </p>
                  )}
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => showJoinSquadModal()}
                >
                  Join
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Squad Details"
        open={openSquadModal}
        footer={null}
        onCancel={hideSquadModal}
        okText="Join"
        cancelText="cancel"
      >
        <div
          style={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "24px" }}>squad name</p>
          {/* <List
            style={{ maxHeight: "350px", overflow: "scroll" }}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  // className={item.deceased ? "deceased" : null}
                >
                  <p>{item.name}</p>
                </div>
              </List.Item>
            )}

            //style={{ width: "450px" }}
          /> */}

          <Space
            style={{
              // width: "80px",
              marginTop: "20px",
              display: "flex",
              alignSelf: "center",
            }}
          >
            <Button danger>Share Location</Button>
            <Button danger>Leave Squad</Button>
          </Space>
        </div>
      </Modal>
      {/* //////////////// */}

      <Modal
        title="Squad Details"
        open={openJoinSquadModal}
        footer={null}
        onCancel={hideJoinSquadModal}
        okText="Join"
        cancelText="cancel"
      >
        <div
          style={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "24px" }}>squad name</p>
          {/* <List
            style={{ maxHeight: "350px", overflow: "scroll" }}
            bordered
            dataSource={data}
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
                </div>
              </List.Item>
            )}

            //style={{ width: "450px" }}
          /> */}

          <Button
            danger
            style={{
              // width: "80px",
              marginTop: "20px",
              display: "flex",
              alignSelf: "center",
            }}
          >
            Join Squad
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Squads;
