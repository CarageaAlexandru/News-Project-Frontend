import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";
import TopicsList from "./TopicsList";

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
				{/* topic navigate - populate with valid topics */}
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Topics
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item>
							<TopicsList />
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
