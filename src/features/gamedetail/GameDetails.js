import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Tabs, Modal, List } from "antd";
import "./GameDetails.css";

const data = ["John.", "doe.", "Random Name", "george", "Los Angeles "];
const ListItems = () => {
	return (
		<List
			header={<div>Players</div>}
			bordered
			dataSource={data}
			renderItem={(item) => <List.Item>{item}</List.Item>}
            style={{width:"450px"}}
		/>
	);
};

const ChatTab = () => {
	return (
		<div className="chat-tab-box"></div>
	);
};

function GameDetails() {
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
					<p>map</p>
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
				title="Player info"
				open={openInfo}
				onOk={hideInfoModal}
				onCancel={hideInfoModal}
				okText="Done"
			>
				<label>
					bit code
					<input value="fds#$$#Fe" />
				</label>
			</Modal>
		</div>
	);
}

export default GameDetails;
