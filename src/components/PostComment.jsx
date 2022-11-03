import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const PostComment = ({ article_id, setComments, refresh }) => {
	const [username, setUsername] = useState({});
	const [newComment, setNewComment] = useState({});
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `https://caragea-nc-news-backend.herokuapp.com/api/articles/${article_id}/comments`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				body: newComment,
			}),
		})
			.then((response) => {
				if (response.status >= 400) {
					setError("Sorry, something went wrong, please try again");
				}
				return response.json();
			})
			.then(() => {
				refresh();
				setStatus("200");
				setMessage("Thaks for leaving a comment");
			});
	};
	if (error) return <p>{error}</p>;
	if (status === "200") return <p>{message}</p>;
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter name"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="commentBody">
				<Form.Control
					as="textarea"
					rows={3}
					onChange={(event) => setNewComment(event.target.value)}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Post
			</Button>
		</Form>
	);
};

export default PostComment;
