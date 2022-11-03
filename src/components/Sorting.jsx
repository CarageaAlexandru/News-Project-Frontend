import React from "react";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";

const Sorting = () => {
	const [articles, setArticles] = useState({});
	console.log("articles: ", articles);
	const [loading, setLoading] = useState(true);
	const [sort, setSort] = useState("created_at");
	console.log(sort);

	useEffect(() => {
		fetch(
			`https://caragea-nc-news-backend.herokuapp.com/api/articles?sort_by=${sort}`
		)
			.then((response) => response.json())
			.then(({ articles }) => {
				setArticles(articles);
				setLoading(false);
			});
	}, [sort]);
	if (loading) return <p>Loading...</p>;

	return (
		<div>
			{" "}
			<Dropdown className="d-inline-flex p-2 mt-2">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Sort by
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort}`}
							onClick={(event) =>
								setSort(event.target.text.toLowerCase())
							}
						>
							Votes
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort}`}
							onClick={(event) =>
								setSort(event.target.text.toLowerCase())
							}
						>
							comment_count
						</NavLink>
					</Dropdown.Item>
					<Dropdown.Item>
						<NavLink
							to={`/articles?sort_by=${sort}`}
							onClick={(event) => setSort(event.target.text)}
						>
							created_at
						</NavLink>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown className="d-inline-flex p-2 mt-2">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Order By
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item href="/articles?sort_by">
						Ascending
					</Dropdown.Item>
					<Dropdown.Item href="/articles?sort_by">
						Descending
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default Sorting;
