import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Tabs, Modal, List, Button } from "antd";
import { Link } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import Map from "../Map";
import "./GameDetails.css";
import Input from "antd/es/input/Input";


const ListItems = () => {
	const data = [{
		name:"John",
		faction: "zombie"
	},
	{
		name:"doe",
		faction: "human"
	},
	{
		name:"Random Name",
		faction: "zombie"
	},
	{
		name:"george",
		faction: "human"
	}
	]

	const [players,setPlayers] = useState(data)
	return (
		<div class="list-tab-box">
			<List
				header={
					<div className="sidebar-buttons">
						<button  onClick={()=> {
							setPlayers(data)
						}}>All</button>
						<button onClick={()=> {
							setPlayers(data.filter((player)=>player.faction ==="human"))
						}}>Humans</button>
						<button  onClick={()=> {
							setPlayers(data.filter((player)=>player.faction ==="zombie"))
						}}>Zombies</button>
					</div>
				}
				bordered
				dataSource={players}
				renderItem={(item) => <List.Item>{item.name}
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
	const [openEditGame, setOpenEditGame]= useState(false)
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
	const Role = "player"
	return (
		<div>
			<Navbar />
			<p className="game-title">Game name</p>

			<div className="game-btn-container">
				<button onClick={showModal}>Leave Game</button>
				{Role !== "admin" &&<button onClick={showInfoModal}>Player Info</button>}
				{Role === "admin" && <Button style={{ marginBottom:"10px"}}  onClick={()=> setOpenEditGame(true)}>Edit Game</Button>}
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
