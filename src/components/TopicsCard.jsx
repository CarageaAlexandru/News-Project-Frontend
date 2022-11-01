import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { getDay, getHour } from "../Utils/utils";

const TopicsCard = () => {
	const [articles, setArticles] = useState({});

	const slug = useParams();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch(
			`https://caragea-nc-news-backend.herokuapp.com/api/articles?topic=${slug.topic}`
		)
			.then((response) => response.json())
			.then(({ articles }) => {
				setArticles(articles);
				setLoading(false);
			});
	}, [slug]);
	if (loading) return <p>Loading...</p>;

	return (
		<div className="mt-2 ms-2 row row-cols-1 row-cols-md-2 g-4 gap-4">
			{articles.map((article) => {
				const day = getDay(article.created_at);
				const hour = getHour(article.created_at);
				return (
					<Card
						style={{ width: "18rem" }}
						className="text-primary"
						key={article.article_id}
					>
						<Card.Body>
							<Card.Title>{article.title}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								By {article.author}
							</Card.Subtitle>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroup.Item>
								Created at: {day} : {hour}
							</ListGroup.Item>
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
								<Link
									to={`/api/articles/${article.article_id}`}
								>
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

export default TopicsCard;
