import React from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const Vote = ({ article_id, votes }) => {
	const [vote, setVote] = useState(0);
	const [error, setError] = useState(null);

	// optimistic rendering
	function handleVoteChange(increment) {
		setVote((currentVotes) => {
			return currentVotes + increment;
		});
		setError(null);
		return fetch(
			`https://caragea-nc-news-backend.cyclic.app/api/articles/${article_id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					inc_votes: increment,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		).then((response) => {
			if (response.status >= 400) {
				setError("Sorry, something went wrong, please try again");
			}
			response.json();
		});
	}
	if (error) return <p>{error}</p>;
	return (
		<div>
			<ListGroup.Item>
				{" "}
				<Button
					onClick={() => {
						handleVoteChange(1);
					}}
					as="input"
					type="submit"
					value="Like"
				/>{" "}
				Votes: {votes + vote}{" "}
				<Button
					onClick={() => {
						handleVoteChange(-1);
					}}
					as="input"
					type="submit"
					value="Dislike"
				/>{" "}
			</ListGroup.Item>
		</div>
	);
};

export default Vote;
