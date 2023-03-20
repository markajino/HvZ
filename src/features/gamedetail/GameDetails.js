import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Tabs, Modal, List } from "antd";
import { useGeolocated } from "react-geolocated";
import Map from "../Map";
import "./GameDetails.css";
import Input from "antd/es/input/Input";

const data = ["John.", "doe.", "Random Name", "george", "Los Angeles "];
const ListItems = () => {
	return (
		<div class="list-tab-box">
			<List
				header={
					<div className="sidebar-buttons">
						<button>All</button>
						<button>Humans</button>
						<button>Zombies</button>
					</div>
				}
				bordered
				dataSource={data}
				renderItem={(item) => <List.Item>{item}
				</List.Item>}
			//style={{ width: "450px" }}
			/>
		</div>
	);
};

const ChatTab = () => {
	return (
		<div className="chat-tab-box">
			<div className="sidebar-buttons">
				<button>All</button>

				{faction === "zombie" ?
					<button>Zombies</button> : faction === "human" ? <button>Humans</button> : null}
			</div>
			<div className="chat-box">
				<Input style={{ position: "absolute", bottom: 0, right: "20px", width: "25vw", marginRight: "30px", marginBottom: "10px" }} />
			</div>
		</div>
	);
};
const faction = "zombie"
function GameDetails() {
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
	return (
		<div>
			<Navbar />
			<p className="game-title">Game name</p>

			<div className="game-btn-container">
				<button onClick={showModal}>Leave Game</button>
				<button onClick={showInfoModal}>Player Info</button>
			</div>
			<div className="main-container">
				<div className="map-box">
					<p style={{ margin: "10px" }}>Map</p>
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
			{faction === "human" ?
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
				: faction === "zombie" ?
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
						<button>Register kill</button>
						<div>
							Were you patient zero : no
						</div>
						<div>
							<p>Latitude: {coords?.latitude} </p>
							<p>Longitude: {coords?.longitude}</p>
						</div>
					</Modal>
					: null
			}
		</div>
	);
}

export default GameDetails;
