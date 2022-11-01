import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const Articles = () => {
	const [articles, setArticles] = useState({});
	console.log("articles: ", articles);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://caragea-nc-news-backend.herokuapp.com/api/articles`)
			.then((response) => response.json())
			.then(({ articles }) => {
				setArticles(articles);
				setLoading(false);
			});
	}, []);
	if (loading) return <p>Loading...</p>;

	return (
		<div className="row row-cols-1 row-cols-md-2 g-4 gap-4">
			{articles.map((article) => {
				return (
					<Card style={{ width: "18rem" }} className="text-primary">
						<Card.Body>
							<Card.Title>{article.title}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								By {article.author}
							</Card.Subtitle>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroup.Item>Created at: </ListGroup.Item>
							<ListGroup.Item>
								Coment count: {article.comment_count}
							</ListGroup.Item>
							<ListGroup.Item>
								Topic: {article.topic}
							</ListGroup.Item>
							<ListGroup.Item>
								Votes: {article.votes}
							</ListGroup.Item>
							<ListGroup.Item>
                            <Link to={`/api/articles/${article.article_id}`}>
								See article
							</Link>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				);
			})}
		</div>
	);
};

export default Articles;
