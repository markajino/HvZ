import { Button, Input, InputNumber, Space, List, Modal } from "antd";
import React, { useState } from "react";
import "../gamedetail/GameDetails.css";
import { useSelector } from "react-redux";

function Squads({
  hideSquadModal,
  showSquadModal,
  openSquadModal,
  setOpenSquadModal,
  openJoinSquadModal,
  setOpenJoinSquadModal,
  hideJoinSquadModal,
  showJoinSquadModal,
}) {
  const user = useSelector((state) => state.user);

  const data = [
    {
      name: "squad 1",
      members: 5,
      deceased: 2,
      deceased: true,
    },
    {
      name: "squad 1",
      members: 5,
      deceased: 2,
      deceased: false,
    },
    {
      name: "squad 1",
      members: 5,
      deceased: 2,
      deceased: true,
    },
  ];
  return (
    <div className="squads-tab-box">
      <div className="squads-box-details">
        <p className="squads-title">Create Squads</p>
        <Space direction="vertical">
          <div className="squads-inputs">
            <Input placeholder="Name" className="squads-inputfield" />
            <Button danger>Create</Button>
          </div>
        </Space>
      </div>
      <div className="squad-join-container">
        <p className="squads-title">Join Squads</p>
        <List
          hello
          dataSource={data}
          renderItem={(squad) => (
            <List.Item>
              <div className="squad-join-box">
                <p className="squad-join-title">{squad.name}</p>
                <div>
                  <p style={{ margin: 0 }} className="squad-join-members">
                    members: {squad.members}
                  </p>
                  <p style={{ marginTop: 0 }}>deceased: {squad.deceased}</p>
                </div>
                <Button
                  type="primary"
                  danger
                  onClick={() => showJoinSquadModal()}
                >
                  View
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
          <List
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
                  className={item.deceased ? "deceased" : null}
                >
                  <p>{item.name}</p>
                  {item.deceased ? <p> {"Deceased"}</p> : null}
                </div>
              </List.Item>
            )}

            //style={{ width: "450px" }}
          />

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
          <List
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
                  className={item.deceased ? "deceased" : null}
                >
                  <p>{item.name}</p>
                  {item.deceased ? <p> {"Deceased"}</p> : null}
                </div>
              </List.Item>
            )}

            //style={{ width: "450px" }}
          />

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
