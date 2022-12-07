import { React, useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserContext } from "./UserContext";

const Users = () => {
	const initialState = "jessjelly";
	const [users, setUsers] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { setLoggedIn } = useContext(UserContext);

	useEffect(() => {
		fetch(`https://caragea-nc-news-backend.cyclic.app/api/users`)
			.then((response) => response.json())
			.then(({ users }) => {
				setUsers(users);
				setError(null);
			})
			.catch((error) => {
				setError({ error });
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	if (error) {
		return <p>Sorry, something went wrong, please try again</p>;
	}
	if (loading) {
		return <p>Loading ...</p>;
	}

	return (
		<Container  >
			<Row className="r">
				<Col >
					<div className="mt-2 ms-2 row row-cols-1 row-cols-md-2 g-2 gap-4 justify-content-center">
						{users.map((user) => {
							const { username, name, avatar_url } = user;
							return (
								<Card
									key={username}
									style={{
										width: "15rem",
										borderRadius: "105px",
									}}
								>
									<Card.Img
										variant="top"
										src={avatar_url}
										style={{
											width: "200px",
											height: "200px",
											display: "block",
											margin: "auto",
											padding: "10px",
										}}
									/>
									<Card.Body>
										<Card.Title>{username}</Card.Title>
										<Card.Title>{name}</Card.Title>
										<Button
											variant="secondary"
											value={username}
											color="#404258"
											onClick={(event) =>
												setLoggedIn(event.target.value)
											}
										>
											Switch user
										</Button>
									</Card.Body>
								</Card>
							);
						})}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Users;
