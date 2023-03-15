import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe, faBuilding, faUser, faSearch, faCopy, faCab} from '@fortawesome/free-solid-svg-icons';
import 'balloon-css';
import 'balloon-css/balloon.min.css';
import {Tooltip,} from 'react-tippy';

const url = "https://jsonplaceholder.typicode.com/users";

export function Contact() {
	const [userList, setUserList] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [buttonLabel, setButtonLabel] = useState("Copy");

	const handleClick = (user) => {
	  navigator.clipboard.writeText(user.name);
	  setButtonLabel("Copied!");
	  setTimeout(() => setButtonLabel("Copy"), 500);
	};

	const getUser = () => {
		return fetch(url)
		.then(response => response.json())
			.then(data => {
			console.log(data); // will log the Array of 10 elements
			return data; // return the Array
		});
	}
	
	useEffect(() => {
		getUser().then(usersArray => {
			setUserList(usersArray); // set the state with the Array
		});
	}, []);

	// Function to filter the users based on the search query
	const filteredUsers = userList.filter(user =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
		|| user.username.toLowerCase().includes(searchQuery.toLowerCase())
		|| user.email.toLowerCase().includes(searchQuery.toLowerCase())
		|| user.phone.toLowerCase().includes(searchQuery.toLowerCase())
		|| user.website.toLowerCase().includes(searchQuery.toLowerCase())
		|| user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
	useEffect(() => {
		console.log(searchQuery);
	}, [searchQuery]);
	
	return (
		<Container style={{ paddingTop: "10px" }}>
		  <Row className="justify-content-center">
		  	<Col xs={12} className="mb-4">
			<div className="search-bar">
				<input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				<FontAwesomeIcon icon={faSearch} />
			</div>
			</Col>
			{filteredUsers.map(user => (
			  <Col key={user.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
				<Card className="h-100 bg-light shadow-sm card-hover" style={{ borderRadius: "10px" }}>
				  <Card.Body className="d-flex flex-column justify-content-between p-3">
					<div style={{ fontFamily: "Roboto" }}>
					  <h5>{user.name}</h5>
					  <p className="mb-0"><FontAwesomeIcon icon={faUser}/> Username: {user.username}</p>
					  <p className="mb-0"><FontAwesomeIcon icon={faEnvelope}/> {user.email}</p>
					  <p className="mb-0"><FontAwesomeIcon icon={faPhone}/> {user.phone}</p>
					  <p className="mb-0"><FontAwesomeIcon icon={faGlobe}/> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
					  <p className="mb-0"><FontAwesomeIcon icon={faBuilding}/> {user.company.name}</p>
					</div>
					<div>
					<Tooltip title={buttonLabel} position="top" trigger="mouseenter focus" hideOnClick="false">
						<button onClick={() => handleClick(user)} style={{ borderRadius: '10px', fontSize: '14px' }}><FontAwesomeIcon icon={faCopy}/> Copy Profile</button>
					</Tooltip>
					</div>
				  </Card.Body>
				</Card>
			  </Col>
			))}
		  </Row>
		</Container>
	  );

}