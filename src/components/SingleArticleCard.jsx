import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Placeholder from "react-bootstrap/Placeholder";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDay, getHour } from "../Utils/utils";
import Vote from "./Vote";
import Comments from "./Comments";
import PostComment from "./PostComment";

const SingleArticleCard = () => {
	const [comments, setComments] = useState([]);
	const [singleArticle, setSingleArticle] = useState({});
	const [refreshComments, setRefreshComments] = useState(false);
	const [refreshArticles, setRefreshArticles] = useState(false);
	const [loading, setLoading] = useState(true);
	const { article_id } = useParams();
	const { id, author, body, comment_count, created_at, title, topic, votes } =
		singleArticle;

	function refresh() {
		setRefreshArticles(!refreshArticles);
	}
	useEffect(() => {
		const url = `https://caragea-nc-news-backend.cyclic.app/api/articles/${article_id}`;
		fetch(url)
			.then((response) => response.json())
			.then(({ article }) => {
				setSingleArticle(article);
				setLoading(false);
			});
	}, [article_id]);
	if (loading)
		return (
			<div className="d-flex justify-content-around">
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Placeholder as={Card.Title} animation="glow">
							<Placeholder xs={6} />
						</Placeholder>
						<Placeholder as={Card.Text} animation="glow">
							<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
							<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
							<Placeholder xs={8} />
						</Placeholder>
						<Placeholder.Button variant="primary" xs={6} />
					</Card.Body>
				</Card>
			</div>
		);

	const handleDelete = (comment_id) => {
		const url = `https://caragea-nc-news-backend.cyclic.app/api/comments/${comment_id}`;
		fetch(url, {
			method: "DELETE",
		}).then((response) => {
			if (response.status >= 400) {
				return alert("Sorry, something went wrong, please try again.");
			}
			setRefreshComments(!refreshComments);
			alert("Delete Successful");
		});
	};

	const day = getDay(created_at);
	const hour = getHour(created_at);
	return (
		<div className="container">
			<Stack gap={3}>
				<div className="bg-light border container">
					<Card
						style={{ width: "18rem" }}
						className="text-dark d-inline"
						key={id}
					>
						<Card.Body>
							<Card.Title className="text-primary">
								{title}
							</Card.Title>
							<Card.Subtitle className="mb-2 text-info">
								By {author}
							</Card.Subtitle>
						</Card.Body>
						<Card.Text>{body}</Card.Text>
						<ListGroup className="list-group-flush">
							<ListGroup.Item className="text-muted">
								Created at: {day} : {hour}
							</ListGroup.Item>
							<ListGroup.Item>
								Coment count: {comment_count}
							</ListGroup.Item>
							<ListGroup.Item>Topic: {topic}</ListGroup.Item>
							<Vote votes={votes} article_id={article_id} />
							<ListGroup.Item>
								<Link to={`/articles`}>
									Back to all articles
								</Link>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</div>
				<div className="bg-light border">
					<PostComment
						article_id={article_id}
						setComments={setComments}
						comments={comments}
						refresh={refresh}
					/>
				</div>
				<div className="bg-light border">
					<Comments
						article_id={article_id}
						setComments={setComments}
						comments={comments}
						refreshArticles={refreshArticles}
						refreshComments={refreshComments}
						handleDelete={handleDelete}
					/>
				</div>
			</Stack>
		</div>
	);
};

export default SingleArticleCard;
