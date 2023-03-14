import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe, faBuilding, faUser} from '@fortawesome/free-solid-svg-icons';


const url = "https://jsonplaceholder.typicode.com/users";

export function Contact() {
	const [userList, setUserList] = useState([]);

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
	// <FontAwesomeIcon icon="fa-sharp fa-solid fa-user" />
	return (
	<Container style={{ paddingTop: "10px" }}>
		<Row className="justify-content-center">
		{userList.map(user => (
			<Col key={user.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
			<Card className="h-100 bg-light shadow-sm card-hover" style={{ borderRadius: "10px" }}>
				<Card.Body className="d-flex flex-column justify-content-between p-3">
				<div style={{ fontFamily: "Roboto" }}>
					<h5>{user.name}</h5>
					<p className="mb-0"><FontAwesomeIcon icon={faUser} /> Username: {user.username}</p>
					<p className="mb-0"><FontAwesomeIcon icon={faEnvelope} /> {user.email}</p>
					<p className="mb-0"><FontAwesomeIcon icon={faPhone} /> {user.phone}</p>
					<p className="mb-0"><FontAwesomeIcon icon={faGlobe} /> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
					<p className="mb-0"><FontAwesomeIcon icon={faBuilding} /> {user.company.name}</p>
				</div>
				<div className="mt-3 text-center">
					<button className="btn btn-primary">View Profile</button>
				</div>
				</Card.Body>
			</Card>
			</Col>
		))}
		</Row>
	</Container>
	);

}