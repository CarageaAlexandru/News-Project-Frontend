import { React, useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "./UserContext";

const Home = () => {
	const user = useContext(UserContext);
	return (
		<Container>
			<h1>Nc News website</h1>
			<h1>{user}</h1>
		</Container>
	);
};

export default Home;
