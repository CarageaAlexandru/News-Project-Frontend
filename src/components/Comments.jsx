import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getDay, getHour } from "../Utils/utils";
import Button from "react-bootstrap/Button";

const Comments = ({
	article_id,
	comments,
	setComments,
	refreshArticles,
	refreshComments,
	handleDelete,
}) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const url = `https://caragea-nc-news-backend.herokuapp.com/api/articles/${article_id}/comments`;
		fetch(url)
			.then((response) => response.json())
			.then(({ comments }) => {
				setComments(comments);
				setLoading(false);
			});
	}, [refreshArticles, refreshComments]);
	if (loading) return <p>Loading ...</p>;

	return (
		<div className="container">
			{comments.map((comment) => {
				const { author, body, votes, comment_id } = comment;
				const day = getDay(comment.created_at);
				const hour = getHour(comment.created_at);
				return (
					<Card className="text-center mt-2" key={comment_id}>
						<Card.Header>{author}</Card.Header>
						<Card.Body>
							<Card.Title></Card.Title>
							<Card.Text>{body}</Card.Text>
						</Card.Body>
						<Card.Footer className="text-muted">
							{day} : {hour} {"Votes :"} {votes}
						</Card.Footer>
						<Button
							onClick={() => handleDelete(comment_id)}
							variant="primary"
							type="submit"
							className="bg-primary"
						>
							Delete
						</Button>
					</Card>
				);
			})}
		</div>
	);
};

export default Comments;
