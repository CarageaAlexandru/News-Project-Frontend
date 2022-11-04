import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const NavigationBar = () => {
	const { loggedIn } = useContext(UserContext);

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Nav className="me-auto">
					{/* <Link to="/" className="nav-link">
						Home
					</Link> */}
					<Link to="/articles" className="nav-link">
						Articles
					</Link>
					<Link to="/users" className="nav-link">
						Users
					</Link>
					<Navbar.Text>
						Signed in as:{" "}
						<a href="/users">
							{" "}
							<Link to="/users">
								{JSON.stringify(loggedIn, "Guest", 2)}
							</Link>
						</a>
					</Navbar.Text>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
