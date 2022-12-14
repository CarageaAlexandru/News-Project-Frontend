import React from "react";
import { Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getDay, getHour } from "../Utils/utils";
import Dropdown from "react-bootstrap/Dropdown";
import TopicsList from "./TopicsList";

const Articles = () => {
	const [articles, setArticles] = useState({});
	const [loading, setLoading] = useState(true);
	const [sort_by, setSort_by] = useState("created_at");
	const [order, setOrder] = useState("asc");
	const [topic, setTopic] = useState("All");

	useEffect(() => {
		let path = `https://caragea-nc-news-backend.cyclic.app/api/articles?sort_by=${sort_by}&order=${order}`;
		if (topic !== "All") {
			path += `&topic=${topic}`;
		}

		fetch(path)
			.then((response) => response.json())
			.then(({ articles }) => {
				setArticles(articles);
				setLoading(false);
			});
	}, [sort_by, order, topic]);
	if (loading) return <p>Loading...</p>;

	return (
		<>
			<Dropdown className="d-inline-flex p-2 mt-2 ">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Sort by
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
							onClick={(event) =>
								setSort_by(event.target.text.toLowerCase())
							}
						>
							Votes
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
							onClick={(event) => setSort_by("comment_count")}
						>
							Comments
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
							onClick={(event) => setSort_by("created_at")}
						>
							Date
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}`}
							onClick={(event) =>
								setSort_by(event.target.text.toLowerCase())
							}
						>
							Author
						</NavLink>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown className="d-inline-flex p-2 mt-2">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Order By
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
							onClick={(event) => setOrder("asc")}
						>
							Ascending
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
							onClick={(event) => setOrder("desc")}
						>
							Descending
						</NavLink>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown className="d-inline-flex p-2 mt-2">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Topics
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<TopicsList
						setTopic={setTopic}
						order={order}
						sort_by={sort_by}
					/>
				</Dropdown.Menu>
			</Dropdown>
			{/* dropdown ends here */}
			<div className="mt-2 ms-2 row row-cols-1 row-cols-md-2 g-4 gap-4 justify-content-center">
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
		</>
	);
};

export default Articles;
