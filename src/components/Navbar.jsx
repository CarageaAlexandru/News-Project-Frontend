import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import React from "react";

const NavigationBar = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<img
						alt=""
						src="/Frontend Project/News-Project-Frontend/public/logo192.png"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					Logo
				</Navbar.Brand>
				<Nav className="me-auto">
					<Link to="/" className="nav-link">
						Home
					</Link>
					<Link to="/articles" className="nav-link">
						Articles
					</Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
