import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getDay, getHour } from "../Utils/utils";

const Comments = ({ article_id, comments, setComments, refreshArticles }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const url = `https://caragea-nc-news-backend.herokuapp.com/api/articles/${article_id}/comments`;
		fetch(url)
			.then((response) => response.json())
			.then(({ comments }) => {
				setComments(comments);
				setLoading(false);
			});
	}, [refreshArticles]);
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
					</Card>
				);
			})}
		</div>
	);
};

export default Comments;
