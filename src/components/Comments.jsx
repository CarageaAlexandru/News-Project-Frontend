import React from "react";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { getDay, getHour } from "../Utils/utils";
import DeleteModal from "./DeleteModal";
import { UserContext } from "./UserContext";

const Comments = ({
	article_id,
	comments,
	setComments,
	refreshArticles,
	refreshComments,
	handleDelete,
}) => {
	const [loading, setLoading] = useState(true);
	const { loggedIn } = useContext(UserContext);

	useEffect(() => {
		const url = `https://caragea-nc-news-backend.herokuapp.com/api/articles/${article_id}/comments`;
		fetch(url)
			.then((response) => response.json())
			.then(({ comments }) => {
				setComments(comments);
				setLoading(false);
			});
	}, [refreshArticles, refreshComments, article_id, setComments]);
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
						{loggedIn === "Guest" ? (
							<p>Please loggin to delete a comment</p>
						) : (
							<DeleteModal
								comment={comment}
								handleDelete={handleDelete}
							/>
						)}
					</Card>
				);
			})}
		</div>
	);
};

export default Comments;
