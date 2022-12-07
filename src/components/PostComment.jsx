import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const PostComment = ({ article_id, setComments, refresh }) => {
	const [newComment, setNewComment] = useState({});
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);
	const { loggedIn } = useContext(UserContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `https://caragea-nc-news-backend.cyclic.app/api/articles/${article_id}/comments`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: loggedIn,
				body: newComment,
			}),
		})
			.then((response) => {
				if (response.status >= 400) {
					setError("Sorry, something went wrong, please try again.");
				}
				return response.json();
			})
			.then(() => {
				refresh();
				setStatus("200");
				setMessage("Thanks for leaving a comment.");
			});
	};
	if (error) return <p>{error}</p>;
	if (status === "200") return <p>{message}</p>;
	if (loggedIn === "Guest") return <p>Pick a user to leave a comment</p>;
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username</Form.Label>
				<Form.Control disabled type="text" placeholder={loggedIn} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="commentBody">
				<FloatingLabel
					controlId="floatingTextarea2"
					label="Leave a comment"
				>
					<Form.Control
						style={{ height: "100px" }}
						as="textarea"
						rows={3}
						onChange={(event) => setNewComment(event.target.value)}
					/>
				</FloatingLabel>
			</Form.Group>
			<Button variant="primary" type="submit">
				Post
			</Button>
		</Form>
	);
};

export default PostComment;
