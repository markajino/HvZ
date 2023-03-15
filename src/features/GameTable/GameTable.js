import { Table } from "antd";

import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./GameTable.css";

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


export const GameTable = (props) => {
	const navigate = useNavigate()
	return (
		<div className="game-table-container">
			<Table columns={columns} dataSource={data} onChange={onChange} />
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
